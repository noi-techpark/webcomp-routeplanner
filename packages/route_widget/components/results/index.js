import { html } from 'lit-html';
import { resultItem } from './result_item';
import { results_transport } from './results_transport';

const placeholder_results = [{ price: 24 }, { price: 6 }, { price: 54 }];

export function Results(props) {
  this.resultItem = resultItem.bind(this);

  if (!placeholder_results.length) {
    return null;
  }

  return html`
    <div class="results mt-3">
      <div class="d-md-none">
        <div>
          ${results_transport()}
        </div>
        <div class="results__list">
          ${placeholder_results.map(o => {
            return this.resultItem(o);
          })}
        </div>
      </div>

      <div class="container d-none d-md-block">
        <div class="row">
          <div class="col-12">
            ${results_transport()}
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
