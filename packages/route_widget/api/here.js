import moment from 'moment';
import { toQueryParams } from '../utilities';

const BASE_PATH = 'https://route.ls.hereapi.com/routing/7.2/';
const API_KEY = process.env.HERE_API_KEY;

export async function request_trip_by_car(origin, destination, timing_options) {
  //   const { type, hour, minute, day } = timing_options;
  const params = {
    language: 'it-it',
    apikey: API_KEY,
    waypoint0: `geo!${origin.latitude},${origin.longitude}`,
    waypoint1: `geo!${destination.latitude},${destination.longitude}`,
    mode: 'fastest;car;traffic:disabled;tollroad:-2',
    alternatives: 5,
    routeAttributes: 'waypoints,summary,legs,routeId'
  };

  const response = await fetch(`${BASE_PATH}/calculateroute.json?${toQueryParams(params)}`, { method: 'GET' });
  const data = await response.json();
  console.log(data);

  const shortestTime = Math.min(...data.response.route.map(route => parseInt(route.summary.baseTime, 10)));

  return { ...data, shortestTime };
}
