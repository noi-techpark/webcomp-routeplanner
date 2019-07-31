import { html } from 'lit-html';
import chevronRightImage from '../../../img/chevron-right.svg';
import carImage from '../../../img/car.svg';
import { render__badge } from '../../generics/badge';

export function render__resultsListElement() {
  return html`
    <div class="search__results__listElement d-flex align-items-center justify-content-between">
      <div>
        <div class="d-flex">
          ${render__badge('PIÚ ECONOMICO', 'green')} ${render__badge('PIÚ VELOCE', 'yellow')}
        </div>
        <div>
          <p class="search__results__listElement__range">10:32 - 11:06</p>
        </div>
        <div class="search__results__listElement__transports">
          <img src=${carImage} alt="" />
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div>
          <p class="search__results__listElement__time">
            1h 22min
            <span>
              € 6,50
            </span>
          </p>
        </div>
        <div class="search__results__listElement__chevron_container">
          <img src=${chevronRightImage} alt="" />
        </div>
      </div>
    </div>
  `;
}
