import { html } from 'lit-html';

import findPositionImage from '../../img/find-position.svg';
import minusImage from '../../img/minus.svg';
import plusImage from '../../img/plus.svg';
import expandImage from '../../img/expand.svg';

export function render__mapControls() {
  return html`
    <div class="map_controls">
      <div id="centerMap" class=${`map_controls__button ${this.mobile_open ? `` : `d-none`}`}>
        <img src=${findPositionImage} alt="" />
      </div>
      <div class=${`map_controls__button ${this.mobile_open ? `` : `d-none`}`}>
        <div id="zoomMapIn" class="map_controls__button__element">
          <img src=${plusImage} alt="" />
        </div>
        <div class="map_controls__button__divider"></div>
        <div id="zoomMapOut" class="map_controls__button__element">
          <img src=${minusImage} alt="" />
        </div>
      </div>
      <div
        @click=${() => {
          this.handleFullScreenMap();
        }}
        class="map_controls__button d-md-none"
      >
        <img src=${expandImage} alt="" />
      </div>
    </div>
  `;
}
