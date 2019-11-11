import L from 'leaflet';
import { html } from 'lit-html';
import throttle from 'lodash/throttle';
import changeImage from '../../../img/change.svg';
import crosshairImage from '../../../img/crosshair-on.svg';
import currentLocationImage from '../../../img/find-position.svg';
import fromToDotsImage from '../../../img/from-to-dots.svg';
import fromImage from '../../../img/from.svg';
import toImage from '../../../img/to.svg';
import { toLeaflet, isValidPosition } from '../../../utilities';
import { getCurrentPosition } from '../../route_widget/mapControlsHandlers';

async function fromInputHandler(place, inputString) {
  try {
    const results = await this.request_get_poi(inputString);
    place.poi_search_results = results;
    this.requestUpdate();
  } catch (err) {
    console.log(err);
  }
}

async function setPlaceToCurrentPosition(place, input) {
  try {
    this.loading = true;
    const positionResult = await getCurrentPosition();
    const { latitude, longitude } = positionResult.coords;
    this.current_location = { latitude, longitude };

    place.is_current_position = true;
    place.display_name = 'Posizione corrente';
    place.type = 'coord';
    place.name = `${this.current_location.longitude}:${this.current_location.latitude}:WGS84[DD.DDDDD]`;
    place.latitude = latitude;
    place.longitude = longitude;
    this.requestUpdate();
  } catch (error) {
    if (error.code === error.PERMISSION_DENIED) {
      // eslint-disable-next-line no-alert
      alert('Non hai dato i permessi per la geolocalizzazione. Per piacere attivali e riprova.');
    } else if (error.code === error.TIMEOUT) {
      // eslint-disable-next-line no-alert
      alert('Non è stato possibile geolocalizzarti.');
    }
  } finally {
    this.loading = false;
  }

  if (this.current_location) {
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

    if (input === 'from') {
      this.setFromMarker(this.current_location);
    } else if (input === 'destination') {
      this.setDestinationMarker(this.current_location);
    }
  }
}
function setFromToResult(result) {
  const [longitude, latitude] = result.ref.coords.split(',');
  this.setFromMarker({ longitude, latitude });

  this.from.display_name = result.name;
  this.from.type = 'stopID';
  this.from.name = result.ref.id;
  this.from.longitude = longitude;
  this.from.latitude = latitude;

  if (isValidPosition(this.destination_place)) {
    this.zoomOn([this.from_marker, this.destination_place]);
  } else {
    this.zoomOn(this.from_marker);
  }
}

function setDestinationToResult(result) {
  const [longitude, latitude] = result.ref.coords.split(',');
  this.setDestinationMarker({ longitude, latitude });

  this.destination_place.display_name = result.name;
  this.destination_place.type = 'stopID';
  this.destination_place.name = result.ref.id;
  this.destination_place.longitude = longitude;
  this.destination_place.latitude = latitude;

  if (isValidPosition(this.destination_place)) {
    this.zoomOn([this.from_marker, this.destination_place]);
  } else {
    this.zoomOn(this.from_marker);
  }
}

const throttledFromInputHandler = throttle(fromInputHandler, 500, { leading: true });

export function render__fromTo() {
  this.throttledFromInputHandler = throttledFromInputHandler.bind(this);
  this.setPlaceToCurrentPosition = setPlaceToCurrentPosition.bind(this);
  this.setFromToResult = setFromToResult.bind(this);
  this.setDestinationToResult = setDestinationToResult.bind(this);

  const handleFocusFor = place => () => {
    if (window.innerWidth < 992 && !this.isFullScreen) {
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
          } catch (mozError) {}
        }
      }
      this.map.invalidateSize(true);
      this.isFullScreen = true;
      this.mobile_open = true;
    }

    place.input_select_visible = true;
    this.requestUpdate();
  };

  const renderPlaceInput = (place, setToCurrentLocation, setToResult) => {
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
                .value=${place.input_select_visible && place.is_current_position ? '' : place.display_name}
                @input=${event => this.throttledFromInputHandler(place, event.target.value)}
                @focus=${handleFocusFor(place)}
                @blur=${() => {
                  setTimeout(() => {
                    place.input_select_visible = false;
                    this.requestUpdate();
                  }, 200);
                }}
              />
              <div class=${`fromTo__inputs__input_selection ${place.input_select_visible ? '' : 'hidden'}`}>
                <div class="fromTo__inputs__input_selection__element" @click=${setToCurrentLocation}>
                  <img src=${crosshairImage} alt="" /> La mia posizione
                </div>
                ${place.poi_search_results.map(
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

  return html`
    <div class="fromTo d-flex">
      <div class="fromTo__graphics">
        <img src=${fromImage} alt="" />
        <img class="fromTo__dots_icon" src=${fromToDotsImage} alt="" />
        <img src=${toImage} alt="" />
      </div>
      <div class="fromTo__inputs">
        ${renderPlaceInput(this.from, () => this.setPlaceToCurrentPosition(this.from, 'from'), this.setFromToResult)}
        ${renderPlaceInput(
          this.destination_place,
          () => this.setPlaceToCurrentPosition(this.destination_place, 'destination'),
          this.setDestinationToResult
        )}
      </div>
      <div class="fromTo__button">
        <img src=${changeImage} alt="" @click=${this.swapFromTo} />
      </div>
    </div>
  `;
}
