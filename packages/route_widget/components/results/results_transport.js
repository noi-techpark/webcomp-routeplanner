import { html } from 'lit-html';

export const results_transport = props => {
  return html`
    <div class="results__transport p-md-3 d-md-flex align-items-center justify-content-between">
      <div class="d-flex justify-content-between justify-content-md-start">
        <div class="results__transport_option">
          <p class="fs-20">Tutti</p>
          <p class="d-none d-md-block fs-14 mt-1">1:53h</p>
        </div>
        <div class="results__transport_option">
          <p class="fs-20">Treno</p>
          <p class="d-none d-md-block fs-14 mt-1">1:53h</p>
        </div>
        <div class="results__transport_option">
          <p class="fs-20">Auto</p>
          <p class="d-none d-md-block fs-14 mt-1">1:53h</p>
        </div>
        <div class="results__transport_option">
          <p class="fs-20">Bus</p>
          <p class="d-none d-md-block fs-14 mt-1">2:00h</p>
        </div>
        <div class="results__transport_option">
          <p class="fs-20">...</p>
        </div>
      </div>
      <div class="d-none d-md-block">
        <select name="" id="">
          <option value="">Più enomico e più veloce</option>
          <option value="">Più veloce</option>
          <option value="">Più enomico</option>
        </select>
      </div>
    </div>
  `;
};
