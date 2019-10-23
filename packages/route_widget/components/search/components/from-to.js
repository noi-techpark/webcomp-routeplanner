import { html } from 'lit-html';
import fromImage from '../../../img/from.svg';
import toImage from '../../../img/to.svg';
import fromToDotsImage from '../../../img/from-to-dots.svg';
import changeImage from '../../../img/change.svg';
import crosshairImage from '../../../img/crosshair-on.svg';

export function render__fromTo() {
  const handleFocus = () => {
    if (window.innerWidth < 992 && !this.isFullScreen) {
      const map = this.shadowRoot.getElementById('map');
      map.classList.toggle('closed');
      try {
        document.body.requestFullscreen();
      } catch (error) {
        try {
          document.body.webkitRequestFullscreen();
        } catch (error) {
          try {
            document.body.mozRequestFullScreen();
          } catch (error) {}
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
            .value=${this.from}
            @keyup=${e => {
              this.request_get_poi(e.target.value);
            }}
            @focus=${handleFocus}
            @blur=${() => {
              setTimeout(() => {
                this.from_input_select_visible = false;
              }, 200);
            }}
          />
          <div class=${`fromTo__inputs__input_selection ${this.from_input_select_visible ? '' : 'hidden'}`}>
            <div class="fromTo__inputs__input_selection__element" @click=${e => {}}>
              <img src=${crosshairImage} alt="" /> La mia posizione
            </div>
          </div>
        </div>
        <div class="fromTo__inputs__input_wrapper">
          <p>
            Terme di Merano, Merano
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