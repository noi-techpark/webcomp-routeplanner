import { html } from 'lit-html';
import timesImage from '../../img/times.svg';

export function render_closeFullscreenButton() {
  return html`
    <div class="close_fullscreen_button">
      <img src=${timesImage} alt="" />
    </div>
  `;
}
