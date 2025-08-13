// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import config from "./config";
import { fetch_no_parallel, toQueryParams } from '../utilities';
import { LANGUAGES } from '../constants';


const fetch_poi = fetch_no_parallel();
export async function request_get_odh_poi(language = LANGUAGES.EN) {
  const params = {
    language: language,
    fields: "Id,Detail." + language + ".Title,GpsPoints",
    removenullvalues: true,
    pagesize: 20000,
    origin: config.ORIGIN,
  };

  const response = await fetch_poi(`${config.API_BASE_URL_TOURISM}/STA/ODHActivityPoi?${toQueryParams(params)}`, { method: 'GET' });
  const data = await response.json();

  return data.Items.map(item => {
    let name = item["ContactInfos." + language + ".City"] != null ? item["ContactInfos." + language + ".City"] + ", " + item["Detail." + language + ".Title"] : item["Detail." + language + ".Title"];

    return {
      ...item,
      type: "odh_poi",
      stateless: "",
      ref: {
        coords: ""
      },
      name: name,
    };
  });
}

export async function request_get_odh_poi_details(poiId, language = LANGUAGES.EN) {
  const params = {
    language: language,
    origin: config.ORIGIN,
    removenullvalues: true,
    fields: 'GpsPoints'
  };

  const response = await fetch_poi(`${config.API_BASE_URL_TOURISM}/ODHActivityPoi/` + poiId + `?${toQueryParams(params)}`, { method: 'GET' });
  const data = await response.json();
  return data;
}