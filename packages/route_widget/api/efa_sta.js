import moment from 'moment';
import { fetch_no_parallel, toQueryParams } from '../utilities';
import { LANGUAGES } from '../constants';

const BASE_PATH = window.location.protocol === 'https:' ? 'https://efas.sta.bz.it/apb' : 'http://efa.sta.bz.it/apb';

const fetch_poi = fetch_no_parallel();
export async function request_get_poi(query, language = LANGUAGES.EN) {
  const params = {
    language,
    SpEncId: '0',
    doNotSearchForStops_sf: '1',
    itdLPxx_usage: 'origin',
    odvSugMacro: 'true',
    outputFormat: 'JSON',
    useLocalityMainStop: 'true',
    name_sf: query,
    coordOutputFormat: 'WGS84[DD.DDDDD]'
  };

  const response = await fetch_poi(`${BASE_PATH}/XSLT_STOPFINDER_REQUEST?${toQueryParams(params)}`, { method: 'GET' });
  const data = await response.json();

  const list = data.stopFinder.points;
  // if there's just one point the result is in the form of
  // points: { point: {} } instead of points: [...]
  if (list && list.point) {
    return [list.point];
  }
  return list || [];
}

export async function request_trip(origin, destination, timing_options, options, language = LANGUAGES.EN) {
  const { type, hour, minute, day } = timing_options;
  const params = {
    language,
    outputFormat: 'json',
    coordOutputFormat: 'WGS84[DD.DDDDD]',
    type_origin: origin.type,
    name_origin: origin.name,
    type_destination: destination.type,
    name_destination: destination.name,
    itdTripDateTimeDepArr: type,
    itdTimeHour: hour,
    itdTimeMinute: minute,
    itdDateDayMonthYear: moment(day).format('DD.MM.YYYY'),
    excludedMeans: 1
  };
  if (options.train) {
    params.exclMOT_0 = 1;
  }
  if (options.bus) {
    params.exclMOT_5 = 1;
    params.exclMOT_6 = 1;
  }
  if (options.funicolar) {
    params.exclMOT_8 = 1;
  }

  const response = await fetch(`${BASE_PATH}/XML_TRIP_REQUEST2?${toQueryParams(params)}`, { method: 'GET' });
  const data = await response.json();
  return data.trips;
}
