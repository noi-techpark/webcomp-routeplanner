import { html } from 'lit-html';

export const resultItem = props => {
  return html`
    <div class="results__list__item p-3 d-flex flex-wrap justify-content-between">
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
      <div class="d-flex">
        <div class=""><p class="fs-30">${props.price}€</p></div>
        <div class="ml-4"><a href="">Dettagli ></a></div>
      </div>
    </div>
  `;
};
