export const observed_properties = {
  height: { type: String },
  width: { width: String },

  mobile_open: { type: Boolean },
  current_location: { type: Object },
  // Select places
  from: { type: Object },
  search_results_height: { type: Number },
  search_results: { type: Array },
  car_results: { type: Array },
  destination_name: { type: String, attribute: 'destination-name' },
  destination: { type: String },
  destination_place: { type: Object },

  // Departure time
  departure_time: { type: Number },
  departure_time_hour: { type: Number },
  departure_time_select_visible: { type: Boolean },
  departure_time_select_timings_visible: { type: Boolean },

  // Details
  details_data: { type: Object },

  // Alert
  alert_active: { type: Boolean },
  alert_message: { type: String },

  active_tab: { type: String },

  car_disabled: { type: Boolean, attribute: 'disable-car' },

  is_travel_options_panel_open: { type: Boolean },
  travel_options: { type: Object },
  language: { type: String },
  details_open: { type: Boolean },

  tiles_url: { type: String, attribute: 'tiles-url' },
  attribution: { type: String }
};
