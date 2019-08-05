import { html } from 'lit-html';

import findPositionImage from '../../img/find-position.svg';
import minusImage from '../../img/minus.svg';
import plusImage from '../../img/plus.svg';

export function render__mapControls() {
  return html`
    <div class="map_controls">
      <div class="map_controls__button">
        <img src=${findPositionImage} alt="" />
      </div>
      <div class="map_controls__button">
        <div class="map_controls__button__element">
          <img src=${plusImage} alt="" />
        </div>
        <div class="map_controls__button__divider"></div>
        <div class="map_controls__button__element">
          <img src=${minusImage} alt="" />
        </div>
      </div>
    </div>
  `;
}
