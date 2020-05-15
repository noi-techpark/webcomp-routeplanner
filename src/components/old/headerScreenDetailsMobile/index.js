// HeaderScreenResults
import { html } from 'lit-element';
import { colored_tag } from '../components/coloredTag';

export function HeaderScreenDetailsMobile(props) {
  return html`
    <div class="header_screen_details">
      <div class="container">
        <div class="row pt-2">
          <div class="col-2">
            🔙
          </div>
          <div class="col-10">
            <p class="header_screen_details__title">Detagli percorso</p>
            <p class="">${colored_tag('Piú veloce')}</p>
          </div>
        </div>
        <div class="row">
          <div class="offset-2 col-10">
            <div class="d-flex mt-2 flex-wrap results__list__item__section_schedules">
              <div class="d-flex align-items-center">
                <div>
                  <p class="results__list__item__text">12:54</p>
                  <p class="results__list__item__text">Trento</p>
                </div>
                <div class="ml-3"><p class="results__list__item__text">2:05h</p></div>
                <div class="ml-3">
                  <p class="results__list__item__text">15:04</p>
                  <p class="results__list__item__text">Terme di Merano</p>
                </div>
              </div>
              <div class="results__list__item__change_line d-flex mt-2">
                <p class="results__list__item__text">❌ ❌</p>
                <p class="ml-3 results__list__item__text">100km, 3 Cambi</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="offset-2 col-10 d-flex justify-content-between mt-2">
            <a class="header_screen_details__action_link" href="">Altri orari</a>
            <a class="header_screen_details__action_link" href="">Visualizza mappa</a>
          </div>
        </div>
      </div>
    </div>
  `;
}
