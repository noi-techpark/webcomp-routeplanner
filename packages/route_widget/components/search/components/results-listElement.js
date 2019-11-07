import { html } from 'lit-html';
import chevronRightImage from '../../../img/chevron-right.svg';
import { formatDuration } from '../../../utilities';
import { render__badge } from '../../generics/badge';
import render__leg_badge from './leg-badge';

export function render__resultsListElement(trip) {
  const legs = [...trip.legs].splice(0, 5);
  const half = Math.floor(legs.length / 2);
  const firstHalf = legs.slice(0, half);
  const secondHalf = legs.slice(half);

  return html`
    <div
      class="search__results__listElement d-flex align-items-center justify-content-between"
      @click=${() => {
        this.details_data = trip;

        this.addTripToMap(trip);
      }}
    >
      <div class="search__results__listElement__details">
        <div class="search__results__listElement__badges">
          ${trip.is_fastest ? render__badge('PIÚ VELOCE', 'yellow') : ''}
        </div>
        <div class="search__results__listElement__times">
          <p class="search__results__listElement__range">${trip.startTime} - ${trip.endTime}</p>
          <p class="search__results__listElement__range">${formatDuration(trip.duration.split(':'))}</p>
        </div>
        <div class="search__results__listElement__transports">
          <div class="search__results__listElement__transports__half">
            ${firstHalf.map((leg, i) => render__leg_badge(leg, true))}
          </div>
          <div class="search__results__listElement__transports__half">
            ${secondHalf.map((leg, i) => render__leg_badge(leg, i < secondHalf.length - 1))}
          </div>
        </div>
      </div>
      <div class="search__results__listElement__chevron_container">
        <img src=${chevronRightImage} alt="" />
      </div>
    </div>
  `;
}
