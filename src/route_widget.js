import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import style__leaflet from 'leaflet/dist/leaflet.css';
import { html } from 'lit-element';
import clone from 'lodash/clone';
import flatten from 'lodash/flatten';
import { request_trip, request_get_poi } from './api/efa_sta';
import { request_get_odh_poi } from './api/odh_tourism';
import { request_trip_by_car } from './api/here';
import { BaseClass } from './baseClass';
import { BUS, CABLE_CAR, coord, stop, LANGUAGES, TRAIN, WALKING } from './constants';
import fromImage from './img/from.svg';
import { observed_properties } from './observed-properties';
import style from './scss/main.scss';
import createTranslator from './translations';
import { getStyle, isValidPosition, last, toLeaflet } from './utilities';

class RoutePlanner extends BaseClass {
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

    L.tileLayer(this.tiles_url, {
      attribution: this.attribution
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

    if (!this.language) {
      this.should_render_language_flags = false;
      this.language = this.get_system_language();
    }
    this.switch_language(this.language);

    // load odh pois only on startup
    this.odhPois = await request_get_odh_poi(this.language)

  }

  translatePositionByPixelsOnScreen(position, offset) {
    const pointOnScreen = this.map.project(toLeaflet(position), this.map.getZoom());
    const newPoint = L.point(pointOnScreen.x + offset.x, pointOnScreen.y + offset.y);
    const newLatLong = this.map.unproject(newPoint, this.map.getZoom());

    return newLatLong;
  }

  // eslint-disable-next-line class-methods-use-this
  isMobile() {
    return document.body.offsetWidth < 992;
  }

  /**
   * zooms the map to the point passed or to fit all the points on the map
   * @param {Coordinate|Array<Coordinate>} positions
   */
  zoomOn(positions) {
    // console.log(positions);
    const containerSize = this.shadowRoot.querySelector('.search__search_container').offsetWidth;
    const offset = L.point(this.isMobile() ? 0 : -containerSize / 2, 0);

    if (Array.isArray(positions)) {
      const markers = positions.map(p => L.marker(toLeaflet(p)));
      const group = L.featureGroup(markers);
      const bounds = group.getBounds();

      const p1 = this.translatePositionByPixelsOnScreen(bounds.getNorthEast(), offset);
      const p2 = this.translatePositionByPixelsOnScreen(bounds.getSouthWest(), offset);

      this.map.fitBounds(L.latLngBounds(p1, p2).pad(0.5));
    } else {
      const translatedPosition = this.translatePositionByPixelsOnScreen(positions, offset);

      this.map.setView(translatedPosition, 15);
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

    if (isValidPosition(destination)) {
      this.destination_marker = L.marker(toLeaflet(destination)).addTo(this.map);

      if (isValidPosition(this.from)) {
        this.zoomOn([this.destination_marker, this.from_marker]);
        setTimeout(() => {
          this.zoomOn([this.destination_marker, this.from_marker]);
        }, 500);
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
    if (isValidPosition(from)) {
      this.from_marker = L.marker(toLeaflet(from), { icon: fromIcon }).addTo(this.map);

      if (isValidPosition(this.destination_place)) {
        this.zoomOn([this.destination_place, this.from_marker]);
        setTimeout(() => {
          this.zoomOn([this.destination_place, this.from_marker]);
        }, 500);
      } else {
        this.zoomOn(this.from_marker);
      }
    }
  }

  async handleDestination() {
    if (this.destination) {
      let stopId;
      const [longitude, latitude] = this.destination.split(':');
      // to use stop as destination type
      if (this.destination_type === undefined || this.destination_type === "stop") {
        request_get_poi(this.destination_name).then((poi) => {
          // use best result as stop id
          stopId = poi[0].stateless;
          this.destination_place = {
            display_name: this.destination_name,
            type: stop,
            name: stopId,
            latitude,
            longitude,
            locked: true
          };
          this.setDestinationMarker(this.destination_place);
          this.zoomOn(this.destination_place);
        });
      } else {
        this.destination_place = {
          display_name: this.destination_name,
          type: coord,
          name: `${this.destination}:WGS84[DD.DDDDD]`,
          latitude,
          longitude,
          locked: true
        };
        this.setDestinationMarker(this.destination_place);
        this.zoomOn(this.destination_place);
      }
    }
  }

  /** starts the search if destination and origin are */
  attemptSearch(noCar = false) {
    if (this.destination_place.type.length > 0 && this.from.type.length > 0) {
      this.search(noCar);
    }
  }

  search(noCar = false) {
    // maybe it's just efa that needs this format
    const timing_options = {
      type: ['', 'dep', 'dep', 'arr', ''][this.departure_time],
      hour: this.departure_time_hour.slice(0, 2),
      minute: this.departure_time_hour.slice(2, 4),
      day: this.departure_time_day
    };

    this.search_started = true;

    if (!this.car_disabled && !noCar) {
      this.search_here(timing_options);
    }
    this.search_efa(timing_options);
  }

  async search_here(timing_options) {
    this.is_fetching_here = true;
    try {
      this.car_results = await request_trip_by_car(
        this.from,
        this.destination_place,
        timing_options,
        this.travel_options,
        this.language
      );
    } catch (ex) {
      this.car_results = false;
    }
    this.is_fetching_here = false;
  }

  async search_efa(timing_options) {
    this.is_fetching_efa = true;
    this.requestUpdate();
    this.search_results = await request_trip(
      this.from,
      this.destination_place,
      timing_options,
      this.travel_options,
      this.language
    );
    this.is_fetching_efa = false;

    if (this.search_results === null) {
      return;
    }

    const fastest = this.search_results.reduce((fastest_tmp, trip) =>
      fastest_tmp.duration > trip.duration ? trip : fastest_tmp
    );

    this.search_results = this.search_results.map(trip => {
      const startTime = trip.legs[0].points[0].dateTime.time;
      const endTime = last(last(trip.legs).points).dateTime.time;

      const legTypes = {
        3: BUS,
        4: BUS,
        11: CABLE_CAR,
        12: CABLE_CAR,
        6: TRAIN,
        99: WALKING,
        100: WALKING
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

  addTripToMap(polylines) {
    this.polylines = polylines;

    this.polylines.forEach(p => p.addTo(this.map));

    this.zoomOn(flatten(this.polylines.map(p => p.getLatLngs())));
  }

  addTripToMapHover(polylines) {
    this.polylinesHover = polylines;
    this.polylinesHover.forEach(p => p.addTo(this.map));
  }

  removeTripToMapHover() {
    this.polylinesHover.forEach(p => this.map.removeLayer(p));
    this.polylinesHover = [];
  }

  removeTripFromMap() {
    this.polylines.forEach(p => this.map.removeLayer(p));
    this.polylines = [];
  }

  alert(message) {
    if (this.alert_timeout_ref) {
      clearTimeout(this.alert_timeout_ref);
    }
    this.alert_active = true;
    this.alert_message = message;

    this.alert_timeout_ref = setTimeout(this.remove_alert.bind(this), 5000);
  }

  remove_alert() {
    this.alert_active = false;
  }

  getAnimationState() {
    if (!this.search_started) {
      return 'state-start';
    }

    if (this.details_data) {
      return 'state-details';
    }

    return 'state-results';
  }

  toggle_options_panel() {
    // if closing: discard, if opening: prepare the temp
    this.temp_travel_options = clone(this.travel_options);
    this.is_travel_options_panel_open = !this.is_travel_options_panel_open;
  }

  // eslint-disable-next-line class-methods-use-this
  get_system_language() {
    const locale = navigator.languages ? navigator.languages[0] : navigator.language;
    const lang = locale.substr(0, 2);
    return Object.values(LANGUAGES).includes(lang) ? lang : LANGUAGES.EN;
  }

  switch_language(language) {
    this.language = language;
    this.t = createTranslator(language);
  }

  getResultsStyle() {
    return this.mobile_open
      ? `max-height: calc(100vh - ${this.search_results_height}px - 1rem - 26px);`
      : `max-height: calc(700px - ${this.search_results_height}px - 1rem - 38px);`;
  }

  render() {
    return html`
      ${this.tiles_url
        ? ''
        : html`
            <p style="color:red">Required attribute \`tiles_url\` is missing</p>
          `}
      <style>
        ${getStyle(style__leaflet)} ${getStyle(style)} * {
          --width: ${this.width};
          --height: ${this.height};
        }
      </style>
      <div
        class="routeplanner-widget
          ${this.mobile_open ? `MODE__mobile__open` : `MODE__mobile__closed`}
          ${this.isMobile() ? `mobile` : ``}
          ${this.getAnimationState()}"
      >
        ${this.should_render_language_flags ? `` : this.render__language_flags()}
        ${this.isFullScreen ? this.render_closeFullscreenButton() : null} ${this.render_backgroundMap()}
        ${this.render__mapControls()}
        ${!this.details_data
        ? html`
              ${this.render_search()}
            `
        : html`
              ${this.render_details()}
            `}
        ${this.render__alert()}
      </div>
    `;
  }
}

if (!window.customElements.get('routeplanner-widget')) {
  window.customElements.define('routeplanner-widget', RoutePlanner);
}
