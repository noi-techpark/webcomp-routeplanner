import L from 'leaflet';
import style__leaflet from 'leaflet/dist/leaflet.css';
import { html, LitElement } from 'lit-element';
import { request_get_poi } from './api/efa_sta';
import { render_backgroundMap } from './components/backgroundMap';
import { render_closeFullscreenButton } from './components/closeFullscreenButton';
import { render__details } from './components/details';
import { render__mapControls } from './components/mapControls';
import {
  getCurrentPosition,
  handleFullScreenMap,
  mapControlsHandlers
} from './components/route_widget/mapControlsHandlers';
import { windowSizeListenerClose } from './components/route_widget/windowSizeListener';
import { render__search } from './components/search';
import { render_spinner } from './components/spinner';
import { observed_properties } from './observed-properties';
import style from './scss/main.scss';
import { getSearchContainerHeight, getStyle, toLeaflet } from './utilities';

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
    this.loading = true;
    this.isFullScreen = false;
    this.mobile_open = false;
    this.departure_time = 1;
    this.from = '';
    this.departure_time_select_visible = false;
    this.departure_time_select_timings_visible = false;
    this.departure_time_hour = '0000';
    this.details_data = undefined;
    this.search_results_height = 0;
    this.current_location = {};
    this.search_results = [];
    this.destination_place = { display_name: '', name: '', type: '' };
  }

  static get properties() {
    return observed_properties;
  }

  async initializeMap() {
    this.map = L.map(this.shadowRoot.getElementById('map'), { zoomControl: false });

    L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(this.map);
  }

  async firstUpdated() {
    this.initializeMap();
    this.mapControlsHandlers();
    this.windowSizeListenerClose();
    // Calculate results height
    this.getSearchContainerHeight();
    this.setDestination();

    if (this.destination) {
      this.zoomOn(this.destination_place);
    }

    try {
      const positionResult = await getCurrentPosition();
      const { latitude, longitude } = positionResult.coords;
      this.current_location = { latitude, longitude };

      if (this.destination) {
        const markers = [this.current_location, this.destination_place].map(p => L.marker(toLeaflet(p)));
        this.zoomOn(markers);
      } else if (this.current_location) {
        this.zoomOn(this.current_location);
      }

      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * zooms the map to the point passed or to fit all the points on the map
   * @param {Coordinate|Array<Coordinate>} positions
   */
  zoomOn(positions) {
    if (Array.isArray(positions)) {
      const markers = [this.current_location, this.destination_place].map(p => L.marker(toLeaflet(p)));
      const group = L.featureGroup(markers);

      this.map.fitBounds(group.getBounds().pad(0.5));
    } else {
      this.map.setView(toLeaflet(positions), 15);
    }
  }

  setDestination() {
    if (this.destination) {
      const [longitude, latitude] = this.destination.split(':');

      this.destination_place = {
        display_name: this.destination_name,
        type: 'coord',
        name: `${this.destination}:WGS84[DD.DDDDD]`,
        latitude,
        longitude
      };
    }
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
