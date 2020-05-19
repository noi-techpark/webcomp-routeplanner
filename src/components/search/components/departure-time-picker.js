import { html } from 'lit-html';
import clockImage from '../../../img/clock.svg';
import { render__picker } from '../../generics/picker';
import { PICKER_CLASSES } from '../../../constants';
import { getCurrentHourMinutes, getCurrentDay } from '../../../utilities';

const DEPARTURE_TIME = {
  1: 'depart_now',
  2: 'depart_at'
  // 3: 'Arrivo entro le',
  // 4: 'Ultimo'
};

const time_options = {};
let hour = 0;
let minutes = 0;
for (let i = 0; i < 24; i++) {
  if (i !== 0) {
    hour += 1;
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

export function render__departureTimePicker() {
  const setDepartureTime = async value => {
    this.departure_time = value;
    this.departure_time_select_visible = false;

    if (this.departure_time === '1') {
      this.departure_time_hour = getCurrentHourMinutes();
      this.departure_time_day = getCurrentDay();
      this.attemptSearch(true);
    }

    await this.updateComplete;
    this.getSearchContainerHeight();
  };

  const setDepartureTimeHour = value => {
    const needsToRefresh = this.departure_time_hour !== value;
    this.departure_time_hour = value;
    this.departure_time_select_timings_visible = false;

    if (needsToRefresh) {
      this.attemptSearch(true);
    }
  };

  const setDepartureDay = e => {
    const { value } = e.target;

    const needsToRefresh = this.departure_time_hour !== value && value !== '';

    this.departure_time_day = value;

    if (needsToRefresh) {
      this.attemptSearch(true);
    }
  };

  this.render__picker = render__picker.bind(this);

  return html`
    <div class="departure_time_picker d-flex">
      <img class="clock mr-2" src=${clockImage} alt="" />
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap departure_time_picker__inputs_container">
        ${this.render__picker(
          'departure_time_select_visible',
          DEPARTURE_TIME,
          this.departure_time,
          setDepartureTime,
          [PICKER_CLASSES.borderless],
          this.t
        )}
        ${this.departure_time > 1
          ? this.render__picker(
              'departure_time_select_timings_visible',
              time_options,
              this.departure_time_hour,
              setDepartureTimeHour,
              [PICKER_CLASSES.text_center]
            )
          : ``}
        ${this.departure_time > 1
          ? html`
              <div class="departure_time_picker__input_date">
                <input type="date" value=${this.departure_time_day} @input=${setDepartureDay} />
              </div>
            `
          : ``}
      </div>
    </div>
  `;
}
