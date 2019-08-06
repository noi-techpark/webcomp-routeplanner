import { html } from 'lit-html';
import chevronRightImage from '../../../img/chevron-right.svg';
import infoCircleImage from '../../../img/info-circle.svg';
import carImage from '../../../img/car.svg';
import { render__badge } from '../../generics/badge';
import { render__tooltip } from '../../generics/tooltip';
import { FAKE_DETAILS } from '../../../fake_data';

export function render__resultsListElement() {
  return html`
    <div
      class="search__results__listElement d-flex align-items-center justify-content-between"
      @click=${() => {
        this.details_data = FAKE_DETAILS;
      }}
    >
      <div class="d-flex flex-wrap">
        ${render__badge('PIÚ ECONOMICO', 'green')} ${render__badge('PIÚ VELOCE', 'yellow')}
      </div>
      <div class="search__results__listElement__left">
        <div>
          <p class="search__results__listElement__range">10:32 - 11:06</p>
        </div>
        <div class="search__results__listElement__transports">
          <img src=${carImage} alt="" />
        </div>
      </div>
      <div class="search__results__listElement__right d-flex align-items-center">
        <div>
          <div class="search__results__listElement__time">
            <div>
              <p>1h 22min</p>
            </div>
            <div class="search__results__listElement__time__price d-inline-flex align-items-center">
              <p>€ 6,50</p>
              ${render__tooltip(
                '',
                html`
                  <h3>Prezzo indicativo per un adulto</h3>
                  <p>La cifra mostrata si riferisce ad un biglietto di sola andata per un adulto.</p>
                `,
                infoCircleImage,
                'left'
              )}
            </div>
          </div>
        </div>
        <div class="search__results__listElement__chevron_container">
          <img src=${chevronRightImage} alt="" />
        </div>
      </div>
    </div>
  `;
}
