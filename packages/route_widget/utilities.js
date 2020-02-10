import L from 'leaflet';
import { WALKING_TRIP_COLOR, TRIP_COLORS, WALKING } from './constants';
import { html } from 'lit-element';
import moment from 'moment';
import padStart from 'lodash/padStart';

export const getStyle = array => array[0][1];

export const debounce = func => {
  let timer;
  return function(event) {
    if (timer) {
      clearTimeout(timer);
    }
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

export const formatDuration = ([h, m]) =>
  `${h > 0 ? `${trimLeftZeros(h)}h ` : ''}${trimLeftZeros(m).padStart(1, '0')}m`;
export const formatSecondsDuration = seconds => {
  const [h, m, ...s] = secondsToHMS(seconds);
  return formatDuration([h, m]);
};
export const formatMinutesDuration = minutes => formatSecondsDuration(minutes * 60);
export const formatApproximateSecondsDuration = seconds => {
  if (seconds < 60) {
    return '< 1m';
  }
  return formatSecondsDuration(seconds);
};

export const last = arr => arr[arr.length - 1];

export const toQueryParams = params =>
  Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export const toLeaflet = o => {
  // returns object itself if it's already ok for leaflet
  // eslint-disable-next-line no-underscore-dangle
  if (o._latlng) {
    return o._latlng;
  }
  if (o.lat && (o.lng || o.lon)) {
    return o;
  }

  // otherwise convert it
  const { latitude, longitude } = o;
  return { lat: latitude, lng: longitude };
};

export const isValidPosition = o => {
  if (!o) {
    return false;
  }

  // eslint-disable-next-line no-underscore-dangle
  if (o._latlng) {
    return true;
  }
  if (o.lat && (o.lng || o.lon)) {
    return true;
  }
  if (o.latitude && o.longitude) {
    return true;
  }

  return false;
};

export const EFATripToPolylines = trip =>
  trip.legs
    .map(
      leg =>
        (leg.path
          ? // splits in points
            leg.path.split(' ')
          : // if no path (ie cable car: use start and end points)
            leg.points.map(p => p.ref.coords)
        )
          .map(s => s.split(',')) // splits in [long, lat]
          .map(([long, lat]) => [lat, long]) // format as leaflet wants
    )

    .map((path, i) =>
      L.polyline(path, {
        color: trip.legs[i].type === WALKING ? WALKING_TRIP_COLOR : TRIP_COLORS[i % TRIP_COLORS.length]
      })
    );

export const HERETripToPolylines = trip => [L.polyline(trip.shape.map(s => s.split(',')))];

export const repeatHtml = (htmlToRepeat, amount) =>
  [...new Array(amount)].reduce(
    acc =>
      html`
        ${acc}${htmlToRepeat}
      `,
    html``
  );

export const getCurrentDay = () => moment().format('YYYY-MM-DD');

export const getCurrentHourMinutes = () =>
  moment().format(`HH`) + padStart(`${Math.floor(moment().minute() / 15) * 15}`, 2, '0');
