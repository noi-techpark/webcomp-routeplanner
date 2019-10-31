import L from 'leaflet';
import { html } from 'lit-html';
import throttle from 'lodash/throttle';
import changeImage from '../../../img/change.svg';
import crosshairImage from '../../../img/crosshair-on.svg';
import currentLocationImage from '../../../img/find-position.svg';
import fromToDotsImage from '../../../img/from-to-dots.svg';
import fromImage from '../../../img/from.svg';
import toImage from '../../../img/to.svg';
import { toLeaflet } from '../../../utilities';
import { getCurrentPosition } from '../../route_widget/mapControlsHandlers';

async function fromInputHandler(inputString) {
  try {
    const results = await this.request_get_poi(inputString);
    this.search_results = results;
  } catch (err) {
    console.log(err);
  }
}

async function setFromToCurrentPosition() {
  try {
    this.loading = true;
    const positionResult = await getCurrentPosition();
    const { latitude, longitude } = positionResult.coords;
    this.current_location = { latitude, longitude };
    this.from = {
      is_current_position: true,
      display_name: 'Posizione corrente',
      type: 'coord',
      name: `${this.current_location.longitude}:${this.current_location.latitude}:WGS84[DD.DDDDD]`
    };
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
    const curr_loc_marker = L.marker(toLeaflet(this.current_location), {
      icon: currentLocationIcon
    }).addTo(this.map);
    // zoom on what's available between current location and destination or both
    if (this.destination) {
      const markers = [curr_loc_marker, toLeaflet(this.destination_place)];
      this.zoomOn(markers);
    } else if (this.current_location) {
      this.zoomOn(this.current_location);
    }
  }
}

const throttledFromInputHandler = throttle(fromInputHandler, 500, { leading: true });

export function render__fromTo() {
  this.throttledFromInputHandler = throttledFromInputHandler.bind(this);
  this.setFromToCurrentPosition = setFromToCurrentPosition.bind(this);

  const handleFocus = () => {
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

    this.from_input_select_visible = true;
  };

  return html`
    <div class="fromTo d-flex">
      <div class="fromTo__graphics">
        <img src=${fromImage} alt="" />
        <img class="fromTo__dots_icon" src=${fromToDotsImage} alt="" />
        <img src=${toImage} alt="" />
      </div>
      <div class="fromTo__inputs">
        <div class="fromTo__inputs__input_wrapper">
          <input
            type="text"
            .value=${this.from_input_select_visible && this.from.is_current_position ? '' : this.from.display_name}
            @input=${event => this.throttledFromInputHandler(event.target.value)}
            @focus=${handleFocus}
            @blur=${() => {
              setTimeout(() => {
                this.from_input_select_visible = false;
              }, 200);
            }}
          />
          <div class=${`fromTo__inputs__input_selection ${this.from_input_select_visible ? '' : 'hidden'}`}>
            <div class="fromTo__inputs__input_selection__element" @click=${this.setFromToCurrentPosition}>
              <img src=${crosshairImage} alt="" /> La mia posizione
            </div>
            ${this.search_results.map(
              place =>
                html`
                  <div
                    class="fromTo__inputs__input_selection__element"
                    @click=${() => {
                      this.from = { display_name: place.name, type: 'stopID', name: place.ref.id };
                    }}
                  >
                    ${place.name}
                  </div>
                `
            )}
          </div>
        </div>
        <div class="fromTo__inputs__input_wrapper">
          <p>
            ${this.destination_place.display_name}
          </p>
        </div>
      </div>
      <div class="fromTo__button">
        <img src=${changeImage} alt="" />
      </div>
    </div>
  `;
}
// @input=${e => {
//   this.from = e.target.value;
// }}
