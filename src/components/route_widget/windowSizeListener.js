// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { debounce } from '../../utilities';

export async function closeFullscreen() {
  try {
    document.body.exitFullscreen();
  } catch (error) {
    try {
      document.webkitExitFullscreen();
    } catch (error) {
      try {
        document.body.cancelFullScreen();
      } catch (error) {}
    }
  }
  const map = this.shadowRoot.getElementById('map');
  map.classList.toggle('closed');
  this.isFullScreen = false;
  this.mobile_open = false;
  await this.updateComplete;
  this.getSearchContainerHeight();
}

export function windowSizeListenerClose() {
  this.closeFullscreen = closeFullscreen.bind(this);
  window.addEventListener(
    'resize',
    debounce(async e => {
      if (window.innerWidth >= 992) {
        this.closeFullscreen();
      }
    })
  );
}
