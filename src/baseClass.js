import { LitElement } from 'lit-element';
import { request_get_poi } from './api/efa_sta';
import { request_get_odh_poi } from './api/odh_tourism';
import { requestGetCoordinatesFromSearch } from './api/here';
import { render__alert } from './components/alert';
import { render_backgroundMap } from './components/backgroundMap';
import { render_closeFullscreenButton } from './components/closeFullscreenButton';
import { render__details } from './components/details';
import { render__language_flags } from './components/language_flags';
import { render__mapControls } from './components/mapControls';
import { handleFullScreenMap, mapControlsHandlers } from './components/route_widget/mapControlsHandlers';
import { windowSizeListenerClose } from './components/route_widget/windowSizeListener';
import { render__search } from './components/search/search';
import { PUBLIC_TRANSPORT_TAB } from './constants';
import createTranslator from './translations';
import { getCurrentDay, getCurrentHourMinutes, getSearchContainerHeight } from './utilities';

export class BaseClass extends LitElement {
  constructor() {
    super();
    this.render_backgroundMap = render_backgroundMap.bind(this);
    this.render_search = render__search.bind(this);
    this.render_details = render__details.bind(this);
    this.render__mapControls = render__mapControls.bind(this);
    this.getSearchContainerHeight = getSearchContainerHeight.bind(this);
    this.windowSizeListenerClose = windowSizeListenerClose.bind(this);
    this.mapControlsHandlers = mapControlsHandlers.bind(this);
    this.handleFullScreenMap = handleFullScreenMap.bind(this);
    this.render_closeFullscreenButton = render_closeFullscreenButton.bind(this);
    this.render__alert = render__alert.bind(this);
    this.toggle_options_panel = this.toggle_options_panel.bind(this);
    this.render__language_flags = render__language_flags.bind(this);

    /**
     * Api
     */
    this.request_get_poi = request_get_poi.bind(this);
    this.request_get_odh_poi = request_get_odh_poi.bind(this);
    this.requestGetCoordinatesFromSearch = requestGetCoordinatesFromSearch.bind(this);

    /** Observed values */

    this.is_fetching_efa = false;
    this.is_fetching_here = false;

    this.odhPois = [];

    this.isFullScreen = false;
    this.mobile_open = false;
    this.departure_time = 1;
    this.departure_time_select_visible = false;
    this.departure_time_select_timings_visible = false;
    this.departure_time_hour = getCurrentHourMinutes();
    this.departure_time_day = getCurrentDay();
    this.details_data = undefined;
    this.search_results_height = 0;
    this.current_location = null;
    this.search_results = false;
    this.car_results = false;
    this.active_tab = PUBLIC_TRANSPORT_TAB;

    this.from_poi_search_results = [];
    this.from = {
      display_name: '',
      name: '',
      type: '',
      locked: false,
      poi_search_results: [],
      poi_search_is_fetching: false,
      input_select_visible: false
    };

    this.destination_poi_search_results = [];
    this.destination_place = {
      display_name: '',
      name: '',
      type: '',
      locked: false,
      poi_search_results: [],
      poi_search_is_fetching: false,
      input_select_visible: false
    };

    /** refs to the markers */
    this.from_marker = null;
    this.to_marker = null;
    this.current_position_marker = null;

    this.polylines = [];
    this.polylinesHover = [];

    // alert
    this.alert_active = false;
    this.alert_message = 'Non sono riuscito a trovare la tua posizione';
    this.alert_timeout_ref = null;

    this.is_travel_options_panel_open = false;
    this.travel_options = {};
    this.temp_travel_options = {};

    this.details_open = false;

    this.t = createTranslator(this.get_system_language());

    this.height = '500px';
    this.width = '100%';

    this.should_render_language_flags = true;
  }
}
