// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { format, parse } from 'fecha';
import { fetch_no_parallel, toQueryParams } from '../utilities';
import { LANGUAGES } from '../constants';

const BASE_PATH = window.location.protocol === 'https:' ? 'https://efa.sta.bz.it/idm' : 'http://efa.sta.bz.it/idm';

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

  let list = data.stopFinder.points;
  // if there's just one point the result is in the form of
  // points: { point: {} } instead of points: [...]

  // sort for quality, to have important stations on top
  if (list && list instanceof Array) {
    list.sort(function (a, b) {
      return b.quality - a.quality;
    });
    // only use anyType stop
    list = list.filter(result => result.anyType === 'stop');
  }

  if (list && list.point) {
    return [list.point];
  }
  if (list) {
    return list.filter(result => result.ref.coords);
  }
  return [];

  // temporarily (?) filter out results without coords as we don't handle them yet
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
    itdDateDayMonthYear: format(parse(day, 'YYYY-MM-DD'), 'DD.MM.YYYY'),
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
