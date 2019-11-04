import { fetch_no_parallel, toQueryParams } from '../utilities';

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
  const params = {
    language: 'it',
    outputFormat: 'json',
    coordOutputFormat: 'WGS84[DD.DDDDD]',
    type_origin: origin.type,
    name_origin: origin.name,
    type_destination: destination.type,
    name_destination: destination.name
  };
  const response = await fetch(`${BASE_PATH}/XML_TRIP_REQUEST2?${toQueryParams(params)}`, { method: 'GET' });
  const data = await response.json();
  return data.trips;
}
