import config from "./config";
import { fetch_no_parallel, toQueryParams } from '../utilities';
import { LANGUAGES } from '../constants';

// language=de&pagenumber=1&pagesize=20000&type=255&active=true&fields=GpsPoints&fields=Detail.de.Title&searchfilter=Steiner&removenullvalues=true'

const fetch_poi = fetch_no_parallel();
export async function request_get_odh_poi(search, language = LANGUAGES.EN) {
  const params = {
    language: language,
    referer: "RoutePlanner",
    fields: "Id,Detail."+ language +".Title,GpsPoints",
    searchfilter: search,
    removenullvalues: true,
    type: 32, // gastronomy
    pagesize: 20000,
    origin: config.ORIGIN,
  };

  const response = await fetch_poi(`${config.API_BASE_URL_TOURISM}/ODHActivityPoi?${toQueryParams(params)}`, { method: 'GET' });
  const data = await response.json();

  return  data.Items.map(item => {
    // console.log(item);
    if (item.hasOwnProperty("GpsPoints")) {

      return {
        ...item,
        id: item["Detail." + language + ".Title"],
        ref: {
          coords: item.GpsPoints.position.Longitude + "," + item.GpsPoints.position.Latitude,
        },
        name: item["Detail." + language + ".Title"],
      };
    }
    return {};
  });
}