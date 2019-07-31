import { html } from 'lit-html';
import clockImage from '../../../img/clock.svg';
import { render__picker } from '../../generics/picker';

const DEPARTURE_TIME = {
  1: 'Partenza ora',
  2: 'Partenza alle',
  3: 'Arrivo entro le',
  4: 'Ultimo'
};

export function render__departureTimePicker() {
  const setDepartureTime = value => {
    this.departure_time = value;
    this.departure_time_select_visible = false;
  };

  this.render__picker = render__picker.bind(this);

  return html`
    <div class="departure_time_picker d-flex">
      <img class="clock" src=${clockImage} alt="" /> ${this.render__picker(
        'departure_time_select_visible',
        DEPARTURE_TIME,
        this.departure_time,
        setDepartureTime
      )}
      ${this.departure_time > 1
        ? this.render__picker('departure_time_select_visible', DEPARTURE_TIME, this.departure_time, setDepartureTime)
        : ``}
      ${this.departure_time > 1
        ? html`
            <div>
              <input type="date" />
            </div>
          `
        : ``}
    </div>
  `;
}
