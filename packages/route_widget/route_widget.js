import L from 'leaflet';
import style__leaflet from 'leaflet/dist/leaflet.css';
import { html, LitElement } from 'lit-element';
import { request_get_poi } from './api/efa_sta';
import { render_backgroundMap } from './components/backgroundMap';
import { render__details } from './components/details';
import { render__mapControls } from './components/mapControls';
import { render__search } from './components/search';
import { observed_properties } from './observed-properties';
import style from './scss/main.scss';
import { getStyle, debounce, getSearchContainerHeight } from './utilities';

class RoutePlanner extends LitElement {
  constructor() {
    super();
    this.render_backgroundMap = render_backgroundMap.bind(this);
    this.render_search = render__search.bind(this);
    this.render_details = render__details.bind(this);
    this.render__mapControls = render__mapControls.bind(this);
    this.getSearchContainerHeight = getSearchContainerHeight.bind(this);

    /**
     * Api
     */
    this.request_get_poi = request_get_poi.bind(this);

    /** Observed values */
    this.isFullScreen = false;
    this.mobile_open = false;
    this.departure_time = 1;
    this.from = '';
    this.to = '';
    this.departure_time_select_visible = false;
    this.departure_time_select_timings_visible = false;
    this.departure_time_hour = '0000';
    this.details_data = undefined;
    this.search_results_height = 0;
  }

  static get properties() {
    return observed_properties;
  }

  async initializeMap() {
    this.map = L.map(this.shadowRoot.getElementById('map'), { zoomControl: false }).setView([51.505, -0.09], 13);
    // .setView(
    //   [this.current_location.lat, this.current_location.lng],
    //   13
    // );
    L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(this.map);
  }

  async firstUpdated() {
    this.initializeMap();

    const btnZoomIn = this.shadowRoot.getElementById('zoomMapIn');
    const btnZoomOut = this.shadowRoot.getElementById('zoomMapOut');
    const btnCenterMap = this.shadowRoot.getElementById('centerMap');
    btnZoomIn.onclick = () => {
      this.map.setZoom(this.map.getZoom() + 1);
    };
    btnZoomOut.onclick = () => {
      this.map.setZoom(this.map.getZoom() - 1);
    };
    btnCenterMap.onclick = () => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          this.current_location = { lat: latitude, lng: longitude };
          this.map.flyTo([latitude, longitude], 15);
          this.map.removeLayer(this.layer_columns);
          this.map.removeLayer(this.layer_user);
        },
        () => {}
      );
    };

    window.addEventListener(
      'resize',
      debounce(e => {
        if (window.innerWidth >= 992) {
          try {
            document.body.exitFullscreen();
          } catch (error) {
            try {
              document.webkitExitFullscreen();
            } catch (error) {
              try {
                document.body.cancelFullScreen();
              } catch (error) {}
            }
          }
          const map = this.shadowRoot.getElementById('map');
          map.classList.toggle('closed');
          this.isFullScreen = false;
          this.mobile_open = false;
        }
      })
    );

    // Calculate results height
    this.getSearchContainerHeight();
  }

  handleFullScreenMap() {
    const map = this.shadowRoot.getElementById('map');
    map.classList.toggle('closed');

    if (this.isFullScreen) {
      try {
        document.body.exitFullscreen();
      } catch (error) {
        try {
          document.webkitExitFullscreen();
        } catch (error) {
          try {
            document.body.cancelFullScreen();
          } catch (error) {}
        }
      }
    } else {
      try {
        document.body.requestFullscreen();
      } catch (error) {
        try {
          document.body.webkitRequestFullscreen();
        } catch (error) {
          try {
            document.body.mozRequestFullScreen();
          } catch (error) {}
        }
      }
    }

    this.map.invalidateSize(true);
    this.isFullScreen = !this.isFullScreen;
    this.mobile_open = !this.mobile_open;
  }

  render() {
    return html`
      <style>
        ${getStyle(style__leaflet)}
        ${getStyle(style)}
        ${this.font_family ? `.routeplanner { font-family: ${this.font_family} }` : ''}
      </style>
      <div class="routeplanner-widget ${this.mobile_open ? `MODE__mobile__open` : `MODE__mobile__closed`}">
        ${this.render_backgroundMap()} ${this.render__mapControls()}
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
