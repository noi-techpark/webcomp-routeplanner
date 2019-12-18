export const getStyle = array => array[0][1];

export const debounce = func => {
  let timer;
  return function(event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 500, event);
  };
};

export function getSearchContainerHeight() {
  const search__search_container = this.shadowRoot.querySelector('.search__search_container');
  this.search_results_height = search__search_container.offsetHeight;
}
/**
 * returns a fetch function that aborts previous request
 * useful for autosuggestion-like requests
 */
export const fetch_no_parallel = () => {
  let old_request_controller = null;
  return async (url, params) => {
    if (old_request_controller) {
      old_request_controller.abort();
    }
    const controller = new AbortController();
    old_request_controller = controller;
    const { signal } = controller;

    // try {
    const response = await fetch(url, { ...params, signal });
    return response;
    // } catch (e) {
    //   if (!e.name === 'AbortError') {
    //     throw e;
    //   }
    // }
  };
};

const trimLeftZeros = string => (string ? string.toString().replace(/^0+/, '') : '');

export const secondsToHMS = seconds => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - h * 3600) / 60);
  const s = Math.floor((seconds - h * 3600 - m * 60) / 60);

  return [h, m, s];
};

export const formatDuration = ([h, m]) => `${h > 0 ? `${trimLeftZeros(h)}h ` : ''}${trimLeftZeros(m)}m`;
export const formatMinutesDuration = seconds => {
  const [h, m, ...s] = secondsToHMS(seconds);
  return formatDuration([h, m]);
};

export const last = arr => arr[arr.length - 1];

export const toQueryParams = params =>
  Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export const toLeaflet = o => {
  // returns object itself if it's already ok for leaflet
  // eslint-disable-next-line no-underscore-dangle
  if (o._latlng) return o._latlng;
  if (o.lat && (o.lng || o.lon)) return o;

  // otherwise convert it
  const { latitude, longitude } = o;
  return { lat: latitude, lng: longitude };
};

export const isValidPosition = o => {
  if (!o) return false;

  // eslint-disable-next-line no-underscore-dangle
  if (o._latlng) return true;
  if (o.lat && (o.lng || o.lon)) return true;
  if (o.latitude && o.longitude) return true;

  return false;
};
