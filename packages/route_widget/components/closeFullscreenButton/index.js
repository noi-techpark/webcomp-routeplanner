import { html } from 'lit-html';
import timesImage from '../../img/times.svg';
import { closeFullscreen } from '../route_widget/windowSizeListener';

export function render_closeFullscreenButton() {
  this.closeFullscreen = closeFullscreen.bind(this);

  return html`
    <div
      class="close_fullscreen_button"
      @click=${() => {
        this.from = '';
        this.details_data = undefined;
        this.closeFullscreen();
      }}
    >
      <img src=${timesImage} alt="" />
    </div>
  `;
}
