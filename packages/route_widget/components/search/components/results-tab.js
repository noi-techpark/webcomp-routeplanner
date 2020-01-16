import { html } from 'lit-html';
import { formatSecondsDuration, formatDuration } from '../../../utilities';
import { PUBLIC_TRANSPORT_TAB, CAR_TAB } from '../../../constants';

export function render__resultsTab() {
  if (this.car_disabled) {
    return html``;
  }

  const loadingIndicator = html`
    <div class="loading-skeleton"></div>
  `;

  return html`
    <div class="search__results__tabs d-flex justify-content-between">
      <div
        class=${`search__results__tab  ${this.active_tab === PUBLIC_TRANSPORT_TAB ? ' active' : ''}`}
        @click=${() => {
          this.active_tab = PUBLIC_TRANSPORT_TAB;
        }}
      >
        <p>
          Mezzi pubblici
          <span
            >${this.is_fetching_efa
              ? loadingIndicator
              : this.search_results
              ? formatDuration(this.search_results.find(trip => trip.is_fastest).duration.split(':'))
              : 'Nessun risultato'}</span
          >
        </p>
      </div>
      <div
        class=${`search__results__tab  ${this.active_tab === CAR_TAB ? ' active' : ''}`}
        @click=${() => {
          this.active_tab = CAR_TAB;
        }}
      >
        <p>
          Auto
          <span
            >${this.is_fetching_here
              ? loadingIndicator
              : this.car_results
              ? formatSecondsDuration(this.car_results.shortestTime)
              : 'Nessun risultato'}</span
          >
        </p>
      </div>
    </div>
  `;
}
