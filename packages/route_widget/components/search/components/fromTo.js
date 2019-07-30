import { html } from 'lit-html';
import fromImage from '../../../img/from.svg';
import toImage from '../../../img/to.svg';
import fromToDotsImage from '../../../img/from-to-dots.svg';

export function render__fromTo() {
  return html`
    <div class="fromTo d-flex">
      <div class="fromTo__graphics">
        <img src=${fromImage} alt="" />
        <img class="fromTo__dots_icon" src=${fromToDotsImage} alt="" />
        <img src=${toImage} alt="" />
      </div>
      <div class="fromTo__inputs">
        <input type="text" />
        <input type="text" />
      </div>
      <div class="fromTo__button">
        r
      </div>
    </div>
  `;
}
