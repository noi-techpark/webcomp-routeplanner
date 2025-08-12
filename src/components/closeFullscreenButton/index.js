// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { html } from 'lit-html';
import timesImage from '../../img/times.svg';
import { closeFullscreen } from '../route_widget/windowSizeListener';

export function render_closeFullscreenButton() {
  this.closeFullscreen = closeFullscreen.bind(this);

  return html`
    <div
      class="close_fullscreen_button"
      @click=${() => {
        this.closeFullscreen();
      }}
    >
      <img src=${timesImage} alt="" />
    </div>
  `;
}
