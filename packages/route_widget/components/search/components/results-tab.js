import { html } from 'lit-html';
import { formatMinutesDuration } from '../../../utilities';

export function render__resultsTab() {
  return html`
    <div class="search__results__tabs d-flex justify-content-between">
      <div class="search__results__tab active">
        <p>Treno <span>1:25h</span></p>
      </div>
      <div class="search__results__tab">
        <p>Auto <span>${this.car_results && formatMinutesDuration(this.car_results.shortestTime)}</span></p>
      </div>
    </div>
  `;
}
