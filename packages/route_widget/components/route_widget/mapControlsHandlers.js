export function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
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
