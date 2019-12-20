import { html } from 'lit-html';

export function render__resultsTab() {
  return html`
    <div class="search__results__tabs d-flex justify-content-between">
      <div class="search__results__tab active">
        <p>Tutte <span>1:25h</span></p>
      </div>
      <div class="search__results__tab">
        <p>Treno <span>1:25h</span></p>
      </div>
      <div class="search__results__tab">
        <p>Auto <span>1:25h</span></p>
      </div>
      <div class="search__results__tab">
        <p>Autobus <span>1:25h</span></p>
      </div>
    </div>
  `;
}
