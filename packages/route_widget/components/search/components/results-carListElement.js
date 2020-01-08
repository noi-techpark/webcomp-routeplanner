import { html } from 'lit-html';
import moment from 'moment';
import chevronRightImage from '../../../img/chevron-right.svg';
import { formatMinutesDuration, last } from '../../../utilities';
import { render__badge } from '../../generics/badge';
import { MEANS_ICONS, CAR } from '../../../constants';

export function render__carListElement(trip) {
  const startTime = trip.leg[0].maneuver[0].time;
  const endTime = last(last(trip.leg).maneuver).time;
  const dateFormat = 'HH:mm';

  const length = Math.floor(trip.summary.distance / 1000);

  const label = trip.label.join(' - ');

  return html`
    <div
      class="search__results__listElement d-flex align-items-center justify-content-between"
      @click=${() => {
        this.details_data = trip;

        this.addCarTripToMap(trip);
      }}
    >
      <div class="search__results__listElement__details">
        <div class="search__results__listElement__badges">
          ${trip.is_fastest ? render__badge('PIÚ VELOCE', 'yellow') : ''}
        </div>
        <div class="search__results__listElement__times">
          <p class="search__results__listElement__range">
            ${moment(startTime).format(dateFormat)} - ${moment(endTime).format(dateFormat)} ${length}km
          </p>
          <p class="search__results__listElement__range">${formatMinutesDuration(trip.summary.trafficTime)}</p>
        </div>
        <div class="search__results__listElement__transports"><img src=${MEANS_ICONS[CAR]} alt="car" /> ${label}</div>
      </div>
      <div class="search__results__listElement__chevron_container">
        <img src=${chevronRightImage} alt="" />
      </div>
    </div>
  `;
}
