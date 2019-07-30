import { html } from 'lit-html';
import clockImage from '../../../img/clock.svg';
import chevronDownImage from '../../../img/chevron-down.svg';

const DEPARTURE_TIME = {
  1: 'Partenza ora',
  2: 'Partenza alle',
  3: 'Arrivo entro le',
  4: 'Ultimo'
};

export function render__departureTimePicker() {
  return html`
    <div class="departure_time_picker">
      <div><img class="clock" src=${clockImage} alt="" /></div>
      <div class="ml-2 departure_time_picker__picker">
        ${DEPARTURE_TIME[this.departure_time]} <img src=${chevronDownImage} alt="" />
      </div>
    </div>
  `;
}
