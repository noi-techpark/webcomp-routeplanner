import { html } from 'lit-html';
import throttle from 'lodash/throttle';
import changeImage from '../../../img/change.svg';
import crosshairImage from '../../../img/crosshair-on.svg';
import fromToDotsImage from '../../../img/from-to-dots.svg';
import fromImage from '../../../img/from.svg';
import toImage from '../../../img/to.svg';
import { getCurrentPosition } from '../../route_widget/mapControlsHandlers';

async function fromInputHandler(inputString) {
  try {
    const results = await this.request_get_poi(inputString);
    this.search_results = results;
  } catch (err) {
    console.log(err);
  }
}

const throttledFromInputHandler = throttle(fromInputHandler, 500, { leading: true });

export function render__fromTo() {
  this.throttledFromInputHandler = throttledFromInputHandler.bind(this);

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
            <div
              class="fromTo__inputs__input_selection__element"
              @click=${async () => {
                if (this.current_location) {
                  this.from = {
                    is_current_position: true,
                    display_name: 'Posizione corrente',
                    type: 'coord',
                    name: `${this.current_location.longitude}:${this.current_location.latitude}:WGS84[DD.DDDDD]`
                  };
                } else {
                  try {
                    const positionResult = await getCurrentPosition();
                    const { latitude, longitude } = positionResult.coords;
                    this.current_location = { latitude, longitude };
                  } catch (error) {
                    if (error.code === error.PERMISSION_DENIED) {
                      alert('Non hai dato i permessi per la geolocalizzazione. Per piacere attivali e riprova.');
                    } else if (error.code === error.TIMEOUT) {
                      alert('Non è stato possibile geolocalizzarti.');
                    }
                  }
                }
              }}
            >
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
