import config from "./config";
import { fetch_no_parallel, toQueryParams } from '../utilities';
import { LANGUAGES } from '../constants';


const fetch_poi = fetch_no_parallel();
export async function request_get_odh_poi(language = LANGUAGES.EN) {
  const params = {
    language: language,
    referer: "RoutePlannerWebcomp",
    fields: "Id,Detail." + language + ".Title,GpsPoints",
    removenullvalues: true,
    pagesize: 20000,
    origin: config.ORIGIN,
  };

  const response = await fetch_poi(`${config.API_BASE_URL_TOURISM}/STA/ODHActivityPoi?${toQueryParams(params)}`, { method: 'GET' });
  const data = await response.json();

  return data.Items.map(item => {
    return {
      ...item,
      type: "odh_poi",
      stateless: "",
      ref: {
        coords: ""
      },
      name: item["Detail." + language + ".Title"],
    };
  });
}

export async function request_get_odh_poi_details(poiId, language = LANGUAGES.EN) {
  const params = {
    language: language,
    referer: "RoutePlannerWebcomp",
    origin: config.ORIGIN,
    removenullvalues: true,
    fields: 'GpsPoints'
  };

  const response = await fetch_poi(`${config.API_BASE_URL_TOURISM}/ODHActivityPoi/` + poiId + `?${toQueryParams(params)}`, { method: 'GET' });
  const data = await response.json();
  return data;
}