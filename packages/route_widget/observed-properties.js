export const observed_properties = {
  loading: { type: Boolean },
  font_family: { type: String },
  mobile_open: { type: Boolean },
  current_location: { type: Object },
  // Select places
  from: { type: String },
  from_input_select_visible: { type: Boolean },

  search_results_height: { type: Number },
  search_results: { type: Array },

  from_poi_search_results: { type: Array },

  destination_name: { type: String, attribute: 'destination-name' },
  destination: { type: String },

  // Departure time
  departure_time: { type: Number },
  departure_time_hour: { type: Number },
  departure_time_select_visible: { type: Boolean },
  departure_time_select_timings_visible: { type: Boolean },

  // Details
  details_data: { type: Object }
};
