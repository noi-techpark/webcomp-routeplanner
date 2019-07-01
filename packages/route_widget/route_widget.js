import L from 'leaflet';
import style__leaflet from 'leaflet/dist/leaflet.css';
import { html, LitElement } from 'lit-element';
import { BoxInputs } from './components/boxInputs';
import { BoxParameters } from './components/boxParameters';
import { DetailsMap } from './components/detailsMap';
import { DetailsSidebar } from './components/detailsSidebar';
import { DetailsTopbar } from './components/detailsTopbar';
import { FirstScreenFooter } from './components/firstScreenFooter';
import { Header } from './components/header';
import { HeaderScreenResults } from './components/headerScreenResults';
import { Results } from './components/results';
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

    /** Observed values */
    this.step = 0; // 0,1
    /* Initial form, Results list, Route detail, Map */
    this.step_mobile = 1; // 0,1,2,4
    // this.mobile_open = false;
    this.mobile_open = true;
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
      <div class="routeplanner-widget">
        <div class="MODE__mobile MODE__mobile__closed d-block d-md-none">
          <div class="${this.mobile_open ? `MODE__mobile__open` : `MODE__mobile__closed`}">
            ${this.step_mobile === 0
              ? html`
                  ${this.Header()} ${this.BoxInputs()} ${this.BoxParameters()} ${this.FirstScreenFooter()}
                `
              : ``}
            ${this.step_mobile === 1
              ? html`
                  ${this.HeaderScreenResults()} ${this.Results()}
                `
              : ``}
          </div>
        </div>
        <div class="MODE__desktop d-none d-md-block">
          ${this.step === 0
            ? html`
                ${this.Header()} ${this.BoxParameters()} ${this.Results()} ${this.BoxInputs()}
                ${this.FirstScreenFooter()}
              `
            : ``}
          ${this.step === 1
            ? html`
                <div class="d-flex flex-wrap">
                  ${this.DetailsTopbar()} ${this.DetailsSidebar()} ${this.DetailsMap()}
                </div>
              `
            : ``}
        </div>
      </div>
    `;
  }
}

if (!window.customElements.get('routeplanner-widget')) {
  window.customElements.define('routeplanner-widget', RoutePlanner);
}
