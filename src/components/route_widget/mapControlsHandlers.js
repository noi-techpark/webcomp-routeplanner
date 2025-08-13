// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const DEFAULT_GEOLOCATION_TIMEOUT = 10000;
export function getCurrentPosition(options = {}) {
  //                 milli * s * m   = 1h
  const maximumAge = 1000 * 60 * 60;
  return new Promise((resolve, reject) => {
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        maximumAge,
        timeout: DEFAULT_GEOLOCATION_TIMEOUT,
        ...options
      });
    } else {
      reject(); // geolocalization probably not supported
    }
  });
}

export function mapControlsHandlers() {
  const btnZoomIn = this.shadowRoot.getElementById('zoomMapIn');
  const btnZoomOut = this.shadowRoot.getElementById('zoomMapOut');
  const btnCenterMap = this.shadowRoot.getElementById('centerMap');
  btnZoomIn.onclick = () => {
    this.map.setZoom(this.map.getZoom() + 1);
  };
  btnZoomOut.onclick = () => {
    this.map.setZoom(this.map.getZoom() - 1);
  };
  btnCenterMap.onclick = async () => {
    const { coords } = await getCurrentPosition();
    const { latitude, longitude } = coords;
    this.current_location = { lat: latitude, lng: longitude };
    this.map.flyTo([latitude, longitude], 13);
    this.map.removeLayer(this.layer_columns);
    this.map.removeLayer(this.layer_user);
  };
}

export function handleFullScreenMap() {
  const map = this.shadowRoot.getElementById('map');
  map.classList.toggle('closed');

  if (this.isFullScreen) {
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
  } else {
    try {
      document.body.requestFullscreen();
    } catch (error) {
      try {
        document.body.webkitRequestFullscreen();
      } catch (error) {
        try {
          document.body.mozRequestFullScreen();
        } catch (error) {}
      }
    }
  }

  this.map.invalidateSize(true);
  this.isFullScreen = !this.isFullScreen;
  this.mobile_open = !this.mobile_open;
}
