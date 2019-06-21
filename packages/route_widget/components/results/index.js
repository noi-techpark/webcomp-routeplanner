import { html } from 'lit-html';
import { resultItem } from './result_item';

export const Results = props => {
  return html`
    <div class="results mt-3">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="results__transport p-3 d-flex align-items-center justify-content-between">
              <div class="d-flex">
                <div class="results__transport_option">
                  <p class="fs-20">Treno</p>
                  <p class="fs-14 mt-1">1:53h</p>
                </div>
                <div class="results__transport_option">
                  <p class="fs-20">Autobus</p>
                  <p class="fs-14 mt-1">2:00h</p>
                </div>
              </div>
              <div>
                <select name="" id="">
                  <option value="">Più enomico e più veloce</option>
                  <option value="">Più veloce</option>
                  <option value="">Più enomico</option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-12 mt-3">
            <div class="results__list">
              ${resultItem({ price: 24 })}
              ${resultItem({ price: 16 })}
              ${resultItem({ price: 8 })}
              ${resultItem({ price: 35 })}
              ${resultItem({ price: 12 })}
              ${resultItem({ price: 23 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
