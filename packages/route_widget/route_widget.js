import L from 'leaflet';
import style__leaflet from 'leaflet/dist/leaflet.css';
import { html, LitElement } from 'lit-element';
import { request_get_poi } from './api/efa_sta';
import { BoxInputs } from './components/boxInputs';
import { BoxParameters } from './components/boxParameters';
import { DetailsMap } from './components/detailsMap';
import { DetailsSidebar } from './components/detailsSidebar';
import { DetailsTopbar } from './components/detailsTopbar';
import { FirstScreenFooter } from './components/firstScreenFooter';
import { Header } from './components/header';
import { HeaderScreenDetailsMobile } from './components/headerScreenDetailsMobile';
import { HeaderScreenResults } from './components/headerScreenResultsMobile';
import { Results } from './components/results';
import { RouteList } from './components/routeList';
import { observed_properties } from './observed_properties';
import style from './scss/main.scss';
import { getStyle } from './utilities';

class RoutePlanner extends LitElement {
  constructor() {
    super();
    this.Header = Header.bind(this);
    this.BoxParameters = BoxParameters.bind(this);
    this.BoxInputs = BoxInputs.bind(this);
    this.FirstScreenFooter = FirstScreenFooter.bind(this);
    this.Results = Results.bind(this);
    this.DetailsTopbar = DetailsTopbar.bind(this);
    this.DetailsSidebar = DetailsSidebar.bind(this);
    this.DetailsMap = DetailsMap.bind(this);
    this.HeaderScreenResults = HeaderScreenResults.bind(this);
    this.HeaderScreenDetailsMobile = HeaderScreenDetailsMobile.bind(this);
    this.RouteList = RouteList.bind(this);
    /**
     * Api
     */
    this.request_get_poi = request_get_poi.bind(this);

    /** Observed values */
    this.step = 1; // 0,1
    /* Initial form, Results list, Route detail, Map */
    this.step_mobile = 2; // 0,1,2,3
    // this.mobile_open = false;
    this.mobile_open = false;
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
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(this.map);
  }

  async firstUpdated() {}

  render() {
    return html`
      <style>
        ${getStyle(style__leaflet)}
        ${getStyle(style)}
        ${this.font_family ? `.routeplanner { font-family: ${this.font_family} }` : ''}
      </style>
      <div class="routeplanner-widget ${this.mobile_open ? `MODE__mobile__open` : `MODE__mobile__closed`}">
        ...    
      </div>
    `;
  }
}

if (!window.customElements.get('routeplanner-widget')) {
  window.customElements.define('routeplanner-widget', RoutePlanner);
}
