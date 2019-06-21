const BASE_PATH = 'https://ipchannels.integreen-life.bz.it/emobility/rest/';
const BASE_PATH_PLUGS = 'https://ipchannels.integreen-life.bz.it/emobility/rest/plugs/';
import _ from 'lodash';

const fetch_options = {
  method: 'GET',
  headers: new Headers({
    Accept: 'application/json'
  })
};

const PLUG_STATES = {
  used: 'USED',
  free: 'FREE'
};

const STATION_STATES = {
  active: 'ACTIVE',
  available: 'AVAILABLE',
  fault: 'FAULT',
  temporaryunavailable: 'TEMPORARYUNAVAILABLE',
  unavailable: 'UNAVAILABLE',
  unknown: 'UNKNOWN',
  undefined: 'undefined'
};

/** STATIONS DETAILS */

async function request__get_stations_details() {
  let response = await fetch(BASE_PATH + 'get-station-details', fetch_options);
  return await response.json();
}

export async function get_available_stations_percentage() {
  const stations = await request__get_stations_details();
  const grouped_stations_by_state = _.groupBy(stations, 'state');
  const number_of_stations = stations.length;
  const number_of_active = grouped_stations_by_state[STATION_STATES.active].length;
  const number_of_available = grouped_stations_by_state[STATION_STATES.available].length;
  const sum = number_of_active + number_of_available;
  const perc_available_stations = (sum * 100) / number_of_stations;
  this.chart_1_value = parseInt(perc_available_stations);
  return perc_available_stations;
}

export async function get_number_of_stations() {
  const stations = await request__get_stations_details();
  this.number_of_stations = stations.length;
}

/** PLUG DETAILS */

async function request__get_plugs_details() {
  let response = await fetch(BASE_PATH_PLUGS + 'get-station-details', fetch_options);

  return await response.json();
}

export async function get_plugs_type_distribution() {
  this.load_perc_3 = this.load_perc_3 + 30;
  const plugs_details = await request__get_plugs_details();
  let tot_outlets = 0;
  let exctracted_outlet_types = [];

  this.load_perc_3 = this.load_perc_3 + 10;

  plugs_details.map(details => {
    tot_outlets += details.outlets.length;
    details.outlets.map(outlet => {
      exctracted_outlet_types.push(outlet.outletTypeCode);
    });
  });

  this.load_perc_3 = this.load_perc_3 + 10;

  const distribution_numbers = {};
  _.values(_.groupBy(exctracted_outlet_types)).map(d => {
    distribution_numbers[d[0]] = d.length;
  });
  this.load_perc_3 = this.load_perc_3 + 10;
  const ordered_values = ['Type2Mennekes', 'Type2 - 230Vac', 'Type2 - 400Vac', 'Type 3A', 'CHAdeMO'];
  let distribution_percentage = [];
  this.load_perc_3 = this.load_perc_3 + 10;
  ordered_values.map(type => {
    const perc = (distribution_numbers[type] * 100) / tot_outlets;
    distribution_percentage.push(perc);
  });

  this.load_perc_3 = this.load_perc_3 + 20; // 90%
  this.chart_2_value = distribution_percentage;
}

export async function request__get_use_percentage() {
  this.load_perc_4 = 5;

  const plugs_details = await request__get_plugs_details();

  this.load_perc_4 = 10;

  /** Grouping plugs by parent column id */
  const grouped_plugs = _.groupBy(plugs_details, 'parentStation');
  /**
   * We need to check if at least a plug in a column is used.
   * If so the column will be signed with USED, if not with FREE
   */
  let plug_conditions = [];
  let column_count = 0;
  let plugs_count = 0;
  for (const column in grouped_plugs) {
    if (grouped_plugs.hasOwnProperty(column)) {
      column_count++;
      const column_plugs = grouped_plugs[column];
      for (let i = 0; i < column_plugs.length; i++) {
        plugs_count++;
      }
    }
  }
  /** Loop through grouped plugs */
  let plugs_loop_index = 0;
  for (const column in grouped_plugs) {
    if (grouped_plugs.hasOwnProperty(column)) {
      /** Get the plugs of a column */
      const column_plugs = grouped_plugs[column];
      /**
       * Base state of a column is free,
       * if at least one plug is occupied the column is considered used.
       */
      let column_state = PLUG_STATES.free;
      for (let i = 0; i < column_plugs.length; i++) {
        const plug = column_plugs[i];
        let response = await fetch(`${BASE_PATH_PLUGS}get-newest-record?station=${plug.id}`, fetch_options);

        plugs_loop_index++;
        this.load_perc_4 = 10 + parseInt((plugs_loop_index * 80) / plugs_count);

        try {
          const data = await response.json();
          if (parseInt(data.value) === 0) {
            column_state = PLUG_STATES.used;
          }
        } catch (error) {}
      }

      plug_conditions.push(column_state);
    }
  }

  let used_columns = plug_conditions.filter(o => o === PLUG_STATES.used);

  /** Assign the value to observed props */
  this.chart_3_value = parseInt((used_columns.length * 100) / column_count);

  this.load_perc_4 = this.load_perc_4 + 5;

  /** Return the percentage */
  return parseInt((used_columns.length * 100) / column_count);
}
