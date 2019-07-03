import { html } from 'lit-html';
import { RouteList } from '../routeList';

export const DetailsSidebar = () => {
  return html`
    <div class="details_sidebar">
      <div class="details_sidebar__header p-3">
        <div class="results__list__item__badge_line">
          <p class="results__list__item__badge_line__badge pl-2 pr-2">
            Più economico
          </p>
        </div>
        <div class="d-flex mt-2">
          <div>
            <p>12:54</p>
            <p>Trento</p>
          </div>
          <div class="ml-3"><p>2:05h</p></div>
          <div class="ml-3">
            <p>15:04</p>
            <p>Terme di Merano</p>
          </div>
        </div>
        <div class="results__list__item__change_line d-flex">
          <p>❌ ❌</p>
          <p class="ml-3">100km, 3 Cambi</p>
        </div>
      </div>

      <div class="details_sidebar__body p-3">
        ${RouteList()}
      </div>

      <div class="details_sidebar__footer p-3">
        <button>Salva itinerario</button>
        <button>Stampa</button>
      </div>
    </div>
  `;
};
