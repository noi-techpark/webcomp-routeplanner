import { html } from 'lit-html';
import fromImage from '../../../img/from.svg';
import toImage from '../../../img/to.svg';
import fromToDotsImage from '../../../img/from-to-dots.svg';
import changeImage from '../../../img/change.svg';

export function render__fromTo() {
  console.log(this);

  return html`
    <div class="fromTo d-flex">
      <div class="fromTo__graphics">
        <img src=${fromImage} alt="" />
        <img class="fromTo__dots_icon" src=${fromToDotsImage} alt="" />
        <img src=${toImage} alt="" />
      </div>
      <div class="fromTo__inputs">
        <input
          type="text"
          .value=${this.from}
          @input=${e => {
            this.from = e.target.value;
          }}
        />
        <input
          type="text"
          .value=${this.to}
          @input=${e => {
            this.to = e.target.value;
          }}
        />
      </div>
      <div class="fromTo__button">
        <img src=${changeImage} alt="" />
      </div>
    </div>
  `;
}
