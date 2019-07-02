export async function request_get_poi(query) {
  console.log(query);
  let request = await fetch(
    `http://efa.sta.bz.it/apb/XSLT_STOPFINDER_REQUEST?language=de&outputFormat=JSON&itdLPxx_usage=origin&useLocalityMainStop=true&doNotSearchForStops_sf=1&SpEncId=0&odvSugMacro=true&name_sf=${query}`,
    { method: 'GET' }
  );
  let list = await response.json();
  console.log(list);
}

export async function request_trip(origin, destination) {
  let request = await fetch(
    `http://efa.sta.bz.it/apb/XML_TRIP_REQUEST2?type_origin=stopID&name_origin=${origin}&type_destination=stopID&name_destination=${destination}&outputFormat=json`,
    { method: 'GET' }
  );
  let list = await response.json();
  console.log(list);
}
