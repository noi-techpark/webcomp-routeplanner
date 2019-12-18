import { html } from 'lit-html';
import { formatMinutesDuration, formatDuration } from '../../../utilities';

export function render__resultsTab() {
  return html`
    <div class="search__results__tabs d-flex justify-content-between">
      <div class="search__results__tab active">
        <p>
          Mezzi pubblici
          <span
            >${this.search_results &&
              formatDuration(this.search_results.find(trip => trip.is_fastest).duration.split(':'))}</span
          >
        </p>
      </div>
      <div class="search__results__tab">
        <p>Auto <span>${this.car_results && formatMinutesDuration(this.car_results.shortestTime)}</span></p>
      </div>
    </div>
  `;
}
