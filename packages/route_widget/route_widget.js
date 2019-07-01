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
import { HeaderScreenDetailsMobile } from './components/headerScreenDetailsMobile';
import { HeaderScreenResults } from './components/headerScreenResultsMobile';
import { Results } from './components/results';
import { observed_properties } from './observed_properties';
import style from './scss/main.scss';
import { getStyle } from './utilities';
import { RouteListItem } from './components/detailsSidebar/route_list_item';

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

    /** Observed values */
    this.step = 0; // 0,1
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
      <div class="routeplanner-widget">
        <!-- Mobile -->
        <div class="MODE__mobile ${this.mobile_open ? `MODE__mobile__open` : `MODE__mobile__closed`} d-block d-md-none">
          <div class="MODE__mobile__closed__container">
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
            ${this.step_mobile === 2
              ? html`
                  ${this.HeaderScreenDetailsMobile()}
                  <div class="details_sidebar__body p-3">
                    ${RouteListItem({
                      time: '12:40',
                      text: 'Cammina fino alla stazione dei treni di Trento',
                      duration: '(10min)'
                    })}
                    ${RouteListItem({
                      time: '12:40',
                      text: 'Cammina fino alla stazione dei treni di Trento',
                      duration: '(10min)'
                    })}
                    ${RouteListItem({
                      time: '12:40',
                      text: 'Cammina fino alla stazione dei treni di Trento',
                      duration: '(10min)'
                    })}
                    ${RouteListItem({
                      time: '12:40',
                      text: 'Cammina fino alla stazione dei treni di Trento',
                      duration: '(10min)'
                    })}
                  </div>
                `
              : ``}
            <div class="MODE__mobile__expand_button_container">
              <button
                @click=${() => {
                  this.mobile_open = !this.mobile_open;
                  console.log(this.mobile_open);
                }}
              >
                E
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop -->
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
