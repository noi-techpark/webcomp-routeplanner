import L from 'leaflet';
import { html } from 'lit-html';
import throttle from 'lodash/throttle';
import changeImage from '../../../img/change.svg';
import crosshairImage from '../../../img/crosshair-on.svg';
import currentLocationImage from '../../../img/find-position.svg';
import fromToDotsImage from '../../../img/from-to-dots.svg';
import fromImage from '../../../img/from.svg';
import toImage from '../../../img/to.svg';
import geolocationBlue from '../../../img/geolocation-blue.svg';
import geolocationHole from '../../../img/geolocation-hole.svg';
import { toLeaflet, isValidPosition, repeatHtml, isMobile } from '../../../utilities';
import { getCurrentPosition } from '../../route_widget/mapControlsHandlers';
import { FROM, DESTINATION, stopID, coord, PLACE_STATES, GEOLOCATION_ERRORS } from '../../../constants';
import { request_get_odh_poi_details } from '../../../api/odh_tourism';

async function fromInputHandler(input_name, input_string) {
  try {
    if (input_name === FROM) {
      this.from.poi_search_is_fetching = true;
    } else if (input_name === DESTINATION) {
      this.destination_place.poi_search_is_fetching = true;
    }
    this.requestUpdate();

    const results = await this.request_get_poi(input_string, this.language);
    let heremaps_results = [];
    if (!results.length) {
      heremaps_results = await this.requestGetCoordinatesFromSearch(input_string);
    }

    let filteredOdhPois = this.odhPois.filter(poi => poi["Detail." + this.language + ".Title"].includes(input_string));

    if (input_name === FROM) {
      this.from.poi_search_results = [...results, ...heremaps_results, ...filteredOdhPois];
      this.from.poi_search_is_fetching = false;
    } else if (input_name === DESTINATION) {
      this.destination_place.poi_search_results = [...results, ...heremaps_results, ...filteredOdhPois];
      this.destination_place.poi_search_is_fetching = false;
    }

    this.requestUpdate();
  } catch (err) {
    console.log(err);
  }
}

async function setPlaceToCurrentPosition(input_name) {
  if (input_name === FROM) {
    this.from = { state: PLACE_STATES.is_geolocating };
  } else if (input_name === DESTINATION) {
    this.destination_place = { state: PLACE_STATES.is_geolocating };
  }

  try {
    const positionResult = await getCurrentPosition();
    const { latitude, longitude } = positionResult.coords;
    this.current_location = { latitude, longitude };
  } catch (error) {
    let geolocation_error_name = '';
    if (error.code === error.PERMISSION_DENIED) {
      geolocation_error_name = GEOLOCATION_ERRORS.no_permissions;
    } else if (error.code === error.TIMEOUT) {
      geolocation_error_name = GEOLOCATION_ERRORS.timeout;
    }

    if (input_name === FROM) {
      this.from = { state: PLACE_STATES.geolocation_error, geolocation_error_name };
    } else if (input_name === DESTINATION) {
      this.destination_place = { state: PLACE_STATES.geolocation_error, geolocation_error_name };
    }
  }

  if (this.current_location) {
    const newValues = {
      is_current_position: true,
      display_name: 'current_position',
      state: PLACE_STATES.geolocation_success,
      type: coord,
      name: `${this.current_location.longitude}:${this.current_location.latitude}:WGS84[DD.DDDDD]`,
      latitude: this.current_location.latitude,
      longitude: this.current_location.longitude,
      input_select_visible: false,
      poi_search_is_fetching: false
    };

    if (input_name === FROM) {
      this.from = { ...this.from, ...newValues };
    } else if (input_name === DESTINATION) {
      this.destination_place = { ...this.destination_place, ...newValues };
    }

    this.requestUpdate();
    // create marker for current location
    const currentLocationIcon = L.icon({
      iconUrl: currentLocationImage,
      iconAnchor: [12, 12]
    });

    if (this.current_position_maker) {
      this.map.removeLayer(this.current_position_maker);
    }
    this.current_position_maker = L.marker(toLeaflet(this.current_location), {
      icon: currentLocationIcon
    }).addTo(this.map);

    if (input_name === FROM) {
      this.setFromMarker(this.current_location);
    } else if (input_name === DESTINATION) {
      this.setDestinationMarker(this.current_location);
    }

    this.attemptSearch();
  }
}
function setFromToResult(result) {
  if (result.type === "odh_poi") {
    request_get_odh_poi_details(result.Id, this.language).then(poi => {
      result.ref.coords = poi.GpsPoints.position.Longitude + ',' + poi.GpsPoints.position.Latitude;
      result.stateless = poi.GpsPoints.position.Longitude + ":" + poi.GpsPoints.position.Latitude + ":WGS84[DD.DDDDD]";
      this.assignFrom(result);
    });
  }
  else {
    this.assignFrom(result);
  }
}

function assignFrom(result) {
  const [longitude, latitude] = result.ref.coords.split(',');
  this.setFromMarker({ longitude, latitude });

  this.from.display_name = result.name;
  if (result.type === 'odh_poi') {
    this.from.type = 'coord';
  } else {
    this.from.type = 'any';
  }
  this.from.name = result.stateless;
  this.from.longitude = longitude;
  this.from.latitude = latitude;
  this.from.state = PLACE_STATES.result_selected;

  if (isValidPosition(this.destination_place)) {
    this.zoomOn([this.from_marker, this.destination_place]);
  } else {
    this.zoomOn(this.from_marker);
  }

  this.attemptSearch();
}

function setDestinationToResult(result) {
  if (result.type === "odh_poi") {
    request_get_odh_poi_details(result.Id, this.language).then(poi => {
      result.ref.coords = poi.GpsPoints.position.Longitude + ',' + poi.GpsPoints.position.Latitude;
      result.stateless = poi.GpsPoints.position.Longitude + ":" + poi.GpsPoints.position.Latitude + ":WGS84[DD.DDDDD]";
      this.assignDestination(result)
    });
  }
  else {
    this.assignDestination(result);
  }
}

function assignDestination(result) {
  const [longitude, latitude] = result.ref.coords.split(',');
  this.setDestinationMarker({ longitude, latitude });

  this.destination_place.display_name = result.name;
  if (result.type === "odh_poi") {
    this.destination_place.type = "coord";
    this.destination_place.name = result.stateless;
  } else {
    this.destination_place.type = stopID;
    this.destination_place.name = result.ref.id;
  }
  this.destination_place.longitude = longitude;
  this.destination_place.latitude = latitude;
  this.destination_place.state = PLACE_STATES.result_selected;

  if (isValidPosition(this.destination_place)) {
    this.zoomOn([this.from_marker, this.destination_place]);
  } else {
    this.zoomOn(this.from_marker);
  }

  this.attemptSearch();
}

const throttledFromInputHandler = throttle(fromInputHandler, 500, { leading: true });

export function render__fromTo() {
  this.throttledFromInputHandler = throttledFromInputHandler.bind(this);
  this.setPlaceToCurrentPosition = setPlaceToCurrentPosition.bind(this);
  this.setFromToResult = setFromToResult.bind(this);
  this.assignFrom = assignFrom.bind(this);
  this.assignDestination = assignDestination.bind(this);
  this.setDestinationToResult = setDestinationToResult.bind(this);

  const handleFocusFor = input_name => {
    if (isMobile() && !this.isFullScreen) {
      const map = this.shadowRoot.getElementById('map');
      map.classList.toggle('closed');
      try {
        document.body.requestFullscreen();
      } catch (error) {
        try {
          document.body.webkitRequestFullscreen();
        } catch (webkitError) {
          try {
            document.body.mozRequestFullScreen();
          } catch (mozError) {
            console.error(mozError);
          }
        }
      }
      this.map.invalidateSize(true);
      this.isFullScreen = true;
      this.mobile_open = true;
    }
    if (input_name === FROM) {
      this.from.input_select_visible = true;
    } else if (input_name === DESTINATION) {
      this.destination_place.input_select_visible = true;
    }
    this.requestUpdate();
  };

  const renderPlaceInput = (input_name, setToCurrentLocation, setToResult) => {
    const place = input_name === 'FROM' ? this.from : this.destination_place;

    let textLabel = place.display_name;
    if (place.display_name === 'current_position') {
      textLabel = this.t('current_position');
    }
    if (place.state === PLACE_STATES.is_geolocating) {
      textLabel = this.t('is_geolocating');
    }

    if (place.state === PLACE_STATES.geolocation_error) {
      textLabel = this.t(place.geolocation_error_name);
    }

    // some of the states are "placeholders", they should be deleted when the input is selected
    if (
      place.input_select_visible &&
      [PLACE_STATES.geolocation_error, PLACE_STATES.geolocation_success, PLACE_STATES.is_geolocating].includes(
        place.state
      )
    ) {
      textLabel = '';
    }

    return html`
      <div class="fromTo__inputs__input_wrapper">
        ${place.locked
        ? html`
              <div class="fromTo__inputs__input_wrapper">
                <p>${place.display_name}</p>
              </div>
            `
        : html`
              <input
                type="text"
                class=${`${place.state} ${place.input_select_visible ? 'select_open' : ''}`}
                .value=${textLabel}
                @input=${event => this.throttledFromInputHandler(input_name, event.target.value)}
                @focus=${() => handleFocusFor(input_name)}
                @blur=${() => {
            setTimeout(() => {
              place.input_select_visible = false;
              this.requestUpdate();
            }, 200);
          }}
                placeholder=${this.t(input_name === FROM ? 'origin_placeholder' : 'destination_placeholder')}
              />
              <div class=${`fromTo__inputs__input_selection ${place.input_select_visible ? '' : 'hidden'}`}>
                <div class="fromTo__inputs__input_selection__element use_my_position" @click=${setToCurrentLocation}>
                  <img src=${crosshairImage} alt="" /> ${this.t('use_my_position')}
                </div>
                ${place.poi_search_is_fetching
            ? repeatHtml(
              html`
                        <div class="loading-skeleton fromTo__inputs__input_selection__element"><div></div></div>
                      `,
              3
            )
            : place.poi_search_results &&
            place.poi_search_results.map(
              result =>
                html`
                          <div class="fromTo__inputs__input_selection__element" @click=${() => setToResult(result)}>
                            ${result.name}
                          </div>
                        `
            )}
              </div>
            `}
      </div>
    `;
  };

  const renderFromToIcon = (place, fallback) => {
    if (place.state === PLACE_STATES.is_geolocating) {
      return html`
        <div class="fromToIconContainer">
          <img class="${`left_image ${place.state} `}" src=${geolocationHole} alt="" />
          <img class="${`left_image ${place.state} on_off`}" src=${geolocationBlue} alt="" />
        </div>
      `;
    }
    if (place.state === PLACE_STATES.geolocation_success) {
      return html`
        <img class="${`left_image ${place.state}`}" src=${geolocationBlue} alt="" />
      `;
    }

    return fallback;
  };

  return html`
    <div class="fromTo d-flex">
      <div class="fromTo__graphics">
        ${renderFromToIcon(
    this.from,
    html`
            <img src=${fromImage} alt="" />
          `
  )}
        <img class="fromTo__dots_icon" src=${fromToDotsImage} alt="" />
        ${renderFromToIcon(
    this.destination_place,
    html`
            <img src=${toImage} alt="" />
          `
  )}
      </div>
      <div class="fromTo__inputs">
        ${renderPlaceInput(FROM, () => this.setPlaceToCurrentPosition(FROM), this.setFromToResult)}
        ${renderPlaceInput(DESTINATION, () => this.setPlaceToCurrentPosition(DESTINATION), this.setDestinationToResult)}
      </div>
      <div class="fromTo__button">
        <img src=${changeImage} alt="" @click=${this.swapFromTo} />
      </div>
    </div>
  `;
}
