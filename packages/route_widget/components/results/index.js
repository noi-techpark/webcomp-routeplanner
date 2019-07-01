import { html } from 'lit-html';
import { resultItem } from './result_item';

const placeholder_results = [
  // { price: 24 }
];

export function Results(props) {
  this.resultItem = resultItem.bind(this);

  if (!placeholder_results.length) {
    return null;
  }

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
              ${placeholder_results.map(o => {
                return this.resultItem(o);
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ${this.resultItem({ price: 24 })} ${this.resultItem({ price: 16 })} ${this.resultItem({ price: 8 })}
// ${this.resultItem({ price: 35 })} ${this.resultItem({ price: 12 })} ${this.resultItem({ price: 23 })}
