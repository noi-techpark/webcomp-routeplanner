import { here_options, LANGUAGES } from '../constants';
import { last, toQueryParams } from '../utilities';

const BASE_PATH = 'https://route.ls.hereapi.com/routing/7.2/';
const API_KEY = process.env.HERE_API_KEY;

export async function request_trip_by_car(
  origin,
  destination,
  timing_options,
  travel_options,
  language = LANGUAGES.EN
) {
  const here_travel_options = Object.entries(travel_options)
    .filter(([option, disabled]) => here_options.includes(option) && disabled)
    .map(([option, disabled]) => `${option}:-3`)
    .join(',');

  // https://developer.here.com/documentation/routing/dev_guide/topics/resource-calculate-route.html
  const params = {
    language,
    apikey: API_KEY,
    jsonAttributes: 1 + 8,
    waypoint0: `geo!${origin.latitude},${origin.longitude}`,
    waypoint1: `geo!${destination.latitude},${destination.longitude}`,
    mode: `fastest;car;traffic:disabled;${here_travel_options}`,
    alternatives: 5,
    routeAttributes: 'none,sh,wp,sm,bb,lg,no,li,tx,la',
    maneuverAttributes: 'all',
    metricSystem: 'metric'
  };

  const date = new Date(
    `${timing_options.day.split('-').join('/')} ${timing_options.hour}:${timing_options.minute}`
  ).toISOString();

  if (timing_options.type === 'dep') {
    params.departure = date;
  } else {
    params.arrival = date;
  }

  const response = await fetch(`${BASE_PATH}/calculateroute.json?${toQueryParams(params)}`, { method: 'GET' });
  const data = await response.json();

  const shortestTime = Math.min(...data.response.route.map(route => parseInt(route.summary.baseTime, 10)));
  data.response.route = data.response.route.map(route => {
    const startTime = route.leg[0].maneuver[0].time;
    const endTime = last(last(route.leg).maneuver).time;
    const lengthInKilometers = Math.floor(route.summary.distance / 1000);
    return { ...route, startTime, endTime, lengthInKilometers };
  });

  return { ...data.response, shortestTime };
}
