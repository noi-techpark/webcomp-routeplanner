import { html } from 'lit-html';
import { FAKE_DETAILS } from '../../../fake_data';
import chevronRightImage from '../../../img/chevron-right.svg';
import infoCircleImage from '../../../img/info-circle.svg';
import { MEANS_ICONS } from '../../../means_icons';
import { formatDuration } from '../../../utilities';
import { render__badge } from '../../generics/badge';
import { render__tooltip } from '../../generics/tooltip';

export function render__resultsListElement(trip) {
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
          <p class="search__results__listElement__range">${trip.startTime} - ${trip.endTime}</p>
        </div>
        <div class="search__results__listElement__transports">
          ${trip.legs
            .map(leg => leg.type)
            .map(
              type =>
                html`
                  <img src=${MEANS_ICONS[type]} alt="${type}" />
                `
            )}
        </div>
      </div>
      <div class="search__results__listElement__right d-flex align-items-center">
        <div>
          <div class="search__results__listElement__time">
            <div>
              <p>${formatDuration(trip.duration.split(':'))}</p>
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
