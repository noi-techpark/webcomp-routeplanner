import { fetch_no_parallel } from '../utilities';

const BASE_PATH = 'http://efa.sta.bz.it/apb';

const fetch_poi = fetch_no_parallel();
export async function request_get_poi(query) {
  const parameters = `language=de&outputFormat=JSON&itdLPxx_usage=origin&useLocalityMainStop=true&doNotSearchForStops_sf=1&SpEncId=0&odvSugMacro=true&name_sf=${query}`;

  const response = await fetch_poi(`${BASE_PATH}/XSLT_STOPFINDER_REQUEST?${parameters}`, { method: 'GET' });
  const data = await response.json();

  const list = data.stopFinder.points;
  // if there's just one point the result is in the form of
  // points: { point: {} } instead of points: [...]
  if (list && list.point) {
    return [list.point];
  }
  return list || [];
}

export async function request_trip(origin, destination) {
  const response = await fetch(
    `${BASE_PATH}/XML_TRIP_REQUEST2?type_origin=stopID&name_origin=${origin}&type_destination=stopID&name_destination=${destination}&outputFormat=json`,
    { method: 'GET' }
  );
  const list = await response.json();
  console.log(list);
}
