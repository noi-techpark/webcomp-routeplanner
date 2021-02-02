import { html } from 'lit-html';
import { CAR_TAB, PUBLIC_TRANSPORT_TAB } from '../../constants';
import { repeatHtml } from '../../utilities';
import { render__button } from '../generics/buttons/index';
import { render__options_panel } from '../options_panel';
import { render__departureTimePicker } from './components/departure-time-picker';
import { render__fromTo } from './components/from-to';
import { render__carListElement } from './components/results-carListElement';
import { render__resultsListElement } from './components/results-listElement';
import { render__resultsTab } from './components/results-tab';
import settingsIcon from '../../img/settings.svg';
import chevronDown from '../../img/chevron-down-green.svg';

const PROVIDED_BY_URL = 'https://www.suedtirolmobil.info/';

const loadingSkeleton = html`
  <div class="search__results__listElement">
    <div class="loading-skeleton small"><div></div></div>
    <div class="loading-skeleton big"><div></div></div>
  </div>
`;

function renderList() {
  switch (this.active_tab) {
    case CAR_TAB:
      if (this.is_fetching_here) {
        return repeatHtml(loadingSkeleton, 5);
      }
      return this.car_results
        ? this.car_results.route.map(render__carListElement.bind(this))
        : html`
            <p class="no_results_message">${this.t('no_results_with_car')}</p>
          `;
    case PUBLIC_TRANSPORT_TAB:
      if (this.is_fetching_efa) {
        return repeatHtml(loadingSkeleton, 5);
      }
      return this.search_results
        ? this.search_results.map(render__resultsListElement.bind(this))
        : html`
            <p class="no_results_message">${this.t('no_results_with_public_means')}</p>
          `;
    default:
      return '';
  }
}

export function render__search() {
  return html`
    <div class="search">
      <div class="search__search_container">
        <div class="row">
          <div class="col-12">
            ${render__fromTo.bind(this)()}
          </div>
          <div class="col-12 mt-md-4 d-flex justify-content-between align-items-center flex-wrap">
            <div class="search__footer ${this.departure_time > 1 ? 'full_width' : ''}">
              ${render__departureTimePicker.bind(this)()}
            </div>
            <div class="search__options_button">
              ${render__button(
                html`
                  <img src="${settingsIcon}" /> ${this.t('options')} <img src="${chevronDown} " class="chevron" />
                `,
                this.toggle_options_panel,
                `flat green ${this.is_travel_options_panel_open ? 'open' : 'closed'}`
              )}
            </div>
          </div>
        </div>
      </div>
      <div class="search__search_results_container">
        ${render__options_panel.bind(this)()}

        <div class=${`search__results`} style=${this.getResultsStyle()}>
          ${render__resultsTab.bind(this)()}
          <div class="search__results__list_container">
            ${renderList.bind(this)()}
          </div>
        </div>
      </div>

      ${this.car_results || this.search_results
        ? html`
            <div class="search__data_provider_url">
              ${this.t('data_provided_by')}${' '}
              <a href="${PROVIDED_BY_URL}" target="_blank">${PROVIDED_BY_URL}</a>
            </div>
          `
        : ''}
    </div>
  `;
}
