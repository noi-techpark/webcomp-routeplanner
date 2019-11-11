import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import style__leaflet from 'leaflet/dist/leaflet.css';
import { html, LitElement } from 'lit-element';
import flatten from 'lodash/flatten';
import padStart from 'lodash/padStart';
import moment from 'moment';
import { request_get_poi, request_trip } from './api/efa_sta';
import { render_backgroundMap } from './components/backgroundMap';
import { render_closeFullscreenButton } from './components/closeFullscreenButton';
import { render__details } from './components/details';
import { render__mapControls } from './components/mapControls';
import { handleFullScreenMap, mapControlsHandlers } from './components/route_widget/mapControlsHandlers';
import { windowSizeListenerClose } from './components/route_widget/windowSizeListener';
import { render__search } from './components/search';
import { render_spinner } from './components/spinner';
import { TRIP_COLORS } from './constants';
import fromImage from './img/from.svg';
import { observed_properties } from './observed-properties';
import style from './scss/main.scss';
import { getSearchContainerHeight, getStyle, last, toLeaflet } from './utilities';

class RoutePlanner extends LitElement {
  constructor() {
    super();
    this.render_backgroundMap = render_backgroundMap.bind(this);
    this.render_search = render__search.bind(this);
    this.render_details = render__details.bind(this);
    this.render__mapControls = render__mapControls.bind(this);
    this.getSearchContainerHeight = getSearchContainerHeight.bind(this);
    this.windowSizeListenerClose = windowSizeListenerClose.bind(this);
    this.mapControlsHandlers = mapControlsHandlers.bind(this);
    this.handleFullScreenMap = handleFullScreenMap.bind(this);
    this.render_closeFullscreenButton = render_closeFullscreenButton.bind(this);

    /**
     * Api
     */
    this.request_get_poi = request_get_poi.bind(this);

    /** Observed values */
    this.loading = false;
    this.isFullScreen = false;
    this.mobile_open = false;
    this.departure_time = 1;
    this.departure_time_select_visible = false;
    this.departure_time_select_timings_visible = false;
    this.departure_time_hour = moment().format(`HH`) + padStart(`${Math.floor(moment().minute() / 15) * 15}`, 2, '0');
    this.departure_time_day = moment().format('YYYY-MM-DD');
    this.details_data = undefined;
    this.search_results_height = 0;
    this.current_location = null;
    this.search_results = false;

    this.from_poi_search_results = [];
    this.from = {
      display_name: '',
      name: '',
      type: '',
      locked: false,
      poi_search_results: [],
      input_select_visible: false
    };

    this.destination_poi_search_results = [];
    this.destination_place = {
      display_name: '',
      name: '',
      type: '',
      locked: false,
      poi_search_results: [],
      input_select_visible: false
    };

    /** refs to the markers */
    this.from_marker = null;
    this.to_marker = null;
    this.current_position_marker = null;

    this.polylines = [];
  }

  static get properties() {
    return observed_properties;
  }

  async initializeMap() {
    const DefaultIcon = L.icon({
      iconUrl: icon,
      iconAnchor: [12.5, 41],
      shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    this.map = L.map(this.shadowRoot.getElementById('map'), { zoomControl: false });

    L.tileLayer('//maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
      attribution: '<a href=“https://wikimediafoundation.org/wiki/Maps_Terms_of_Use“>Wikimedia</a>'
    }).addTo(this.map);

    this.map.setView({ lat: 46.49761, lon: 11.349261 }, 13);
  }

  async firstUpdated() {
    this.initializeMap();
    this.mapControlsHandlers();
    this.windowSizeListenerClose();
    // Calculate results height
    this.getSearchContainerHeight();
    await this.handleDestination();
  }

  /**
   * zooms the map to the point passed or to fit all the points on the map
   * @param {Coordinate|Array<Coordinate>} positions
   */
  zoomOn(positions) {
    if (Array.isArray(positions)) {
      const markers = positions.map(p => L.marker(toLeaflet(p)));
      const group = L.featureGroup(markers);

      this.map.fitBounds(group.getBounds().pad(0.5));
    } else {
      this.map.setView(toLeaflet(positions), 15);
    }
  }

  swapFromTo() {
    [this.from, this.destination_place] = [this.destination_place, this.from];
    this.setDestinationMarker(this.destination_place);
    this.setFromMarker(this.from);
  }

  setDestinationMarker(destination) {
    if (this.destination_marker) {
      this.map.removeLayer(this.destination_marker);
    }

    if (destination.latitude) {
      this.destination_marker = L.marker(toLeaflet(destination)).addTo(this.map);

      if (this.from_marker) {
        this.zoomOn([this.destination_marker, this.from_marker]);
      } else {
        this.zoomOn(this.destination_marker);
      }
    }
  }

  setFromMarker(from) {
    const fromIcon = L.icon({
      iconUrl: fromImage,
      iconAnchor: [8, 8]
    });

    if (this.from_marker) {
      this.map.removeLayer(this.from_marker);
    }

    if (from.latitude) {
      this.from_marker = L.marker(toLeaflet(from), { icon: fromIcon }).addTo(this.map);

      if (this.destination_marker) {
        this.zoomOn([this.destination_marker, this.from_marker]);
      } else {
        this.zoomOn(this.from_marker);
      }
    }
  }

  async handleDestination() {
    if (this.destination) {
      const [longitude, latitude] = this.destination.split(':');

      this.destination_place = {
        display_name: this.destination_name,
        type: 'coord',
        name: `${this.destination}:WGS84[DD.DDDDD]`,
        latitude,
        longitude,
        locked: true
      };
      this.setDestinationMarker(this.destination_place);
      this.zoomOn(this.destination_place);
    }
  }

  async search() {
    this.loading = true;

    const timing_options = {
      type: ['', 'dep', 'dep', 'arr', ''][this.departure_time],
      hour: this.departure_time_hour.slice(0, 2),
      minute: this.departure_time_hour.slice(2, 4),
      day: this.departure_time_day
    };

    this.search_results = await request_trip(this.from, this.destination_place, timing_options);
    this.loading = false;

    const fastest = this.search_results.reduce((fastest_tmp, trip) =>
      fastest_tmp.duration > trip.duration ? trip : fastest_tmp
    );

    this.search_results = this.search_results.map(trip => {
      const startTime = trip.legs[0].points[0].dateTime.time;
      const endTime = last(last(trip.legs).points).dateTime.time;

      const legTypes = {
        6: 'train',
        100: 'walking',
        99: 'walking',
        3: 'bus',
        4: 'bus'
      };

      const legs = trip.legs.map(leg => {
        /** this commented code is here to help finding the type of the leg causing a "undefined"
         *  badge, this happens if the api returns a means of transport not already mapped in legTypes
         */
        // if (!legTypes[leg.mode.type]) {
        //   console.log(`leg type ${leg} not in the legTypes object`);
        //   alert(leg.mode.type);
        // }

        const type = legTypes[leg.mode.type];
        return { ...leg, type };
      });

      return { ...trip, startTime, endTime, legs, is_fastest: trip.duration === fastest.duration };
    });
  }

  addTripToMap(trip) {
    this.polylines = trip.legs
      .map(
        leg =>
          leg.path
            .split(' ') // splits in points
            .map(s => s.split(',')) // splits in [long, lat]
            .map(([long, lat]) => [lat, long]) // format as leaflet wants
      )
      .map((path, i) => L.polyline(path, { color: TRIP_COLORS[trip.legs[i].type] }));

    this.polylines.forEach(p => p.addTo(this.map));

    this.zoomOn(flatten(this.polylines.map(p => p.getLatLngs())));
  }

  removeTripFromMap() {
    this.polylines.forEach(p => this.map.removeLayer(p));
    this.polylines = [];
  }

  render() {
    return html`
      <style>
        ${getStyle(style__leaflet)}
        ${getStyle(style)}
        ${this.font_family ? `.routeplanner { font-family: ${this.font_family} }` : ''}
      </style>
      <div class="routeplanner-widget ${this.mobile_open ? `MODE__mobile__open` : `MODE__mobile__closed`}">
        ${this.loading
          ? html`
              <div class="loading">
                ${render_spinner()}
              </div>
            `
          : null}
        ${this.isFullScreen ? this.render_closeFullscreenButton() : null} ${this.render_backgroundMap()}
        ${this.render__mapControls()}
        ${!this.details_data
          ? html`
              ${this.render_search()}
            `
          : html`
              ${this.render_details()}
            `}
      </div>
    `;
  }
}

if (!window.customElements.get('routeplanner-widget')) {
  window.customElements.define('routeplanner-widget', RoutePlanner);
}
