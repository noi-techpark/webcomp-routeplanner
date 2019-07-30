import { html } from 'lit-html';
import clockImage from '../../../img/clock.svg';
import chevronDownImage from '../../../img/chevron-down.svg';
import checkImage from '../../../img/check.svg';

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

  return html`
    <div class="departure_time_picker">
      <div><img class="clock" src=${clockImage} alt="" /></div>
      <div
        class="ml-2 departure_time_picker__picker"
        id="departure_time_picker__picker_box_element"
        @click=${e => {
          this.departure_time_select_visible = true;
        }}
      >
        ${DEPARTURE_TIME[this.departure_time]} <img src=${chevronDownImage} alt="" />
      </div>
      <div class=${`departure_time_picker__picker_box ${this.departure_time_select_visible ? '' : 'hidden'}`}>
        ${Object.keys(DEPARTURE_TIME).map(key => {
          console.log(this.departure_time === parseInt(key));

          return html`
            <div class="departure_time_picker__picker_box_element" @click=${() => setDepartureTime(parseInt(key))}>
              ${this.departure_time === parseInt(key)
                ? html`
                    <img src=${checkImage} alt="" />
                  `
                : ``}
              ${DEPARTURE_TIME[key]}
            </div>
          `;
        })}
      </div>
      ${this.departure_time_select_visible
        ? html`
            <div
              @click=${e => {
                this.departure_time_select_visible = false;
              }}
              class="departure_time_picker__picker_box__closing_underlay"
            ></div>
          `
        : ``}
    </div>
  `;
}
