import { html } from 'lit-html';
import clockImage from '../../../img/clock.svg';
import { render__picker } from '../../generics/picker';

const DEPARTURE_TIME = {
  1: 'Partenza ora',
  2: 'Partenza alle',
  3: 'Arrivo entro le',
  4: 'Ultimo'
};

let time_options = {};
let hour = 0;
let minutes = 0;
for (let i = 0; i < 24; i++) {
  if (i !== 0) {
    hour = hour + 1;
  }
  for (let j = 0; j < 4; j++) {
    if (j !== 0) {
      minutes += 15;
    }
    time_options[`${hour < 10 ? `0${hour}` : hour}${minutes < 10 ? `0${minutes}` : minutes}`] = `${
      hour < 10 ? `0${hour}` : hour
    }:${minutes < 10 ? `0${minutes}` : minutes}`;
  }
  minutes = 0;
}
console.log(time_options);

export function render__departureTimePicker() {
  const setDepartureTime = value => {
    this.departure_time = value;
    this.departure_time_select_visible = false;
  };

  this.render__picker = render__picker.bind(this);

  return html`
    <div class="departure_time_picker d-flex">
      <img class="clock mr-2" src=${clockImage} alt="" />
      <div class="d-flex justify-content-between departure_time_picker__inputs_container">
        ${this.render__picker('departure_time_select_visible', DEPARTURE_TIME, this.departure_time, setDepartureTime)}
        ${this.departure_time > 1
          ? this.render__picker('departure_time_select_timings_visible', time_options, '0000', () => {
              this.departure_time_select_timings_visible = false;
            })
          : ``}
        ${this.departure_time > 1
          ? html`
              <div>
                <input type="date" />
              </div>
            `
          : ``}
      </div>
    </div>
  `;
}
