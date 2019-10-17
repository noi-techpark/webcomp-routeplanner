export function getCurrentPosition(options = {}) {
  // return new Promise((resolve, reject) => {
  //   navigator.geolocation.getCurrentPosition(resolve, reject, options);
  // });
  var geolocation;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      geolocation['latitude'] = position.coords.latitude;
      geolocation['longitude'] = position.coords.longitude;
      printLocation(); // Second time, will be return the location correctly
    });
    return geolocation;
  } else {
    // We cannot access to the geolocation
  }
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
