import { html } from 'lit-html';

export function resultItem(props) {
  console.log(this.step);

  return html`
    <div class="results__list__item p-2 p-md-3 d-flex flex-wrap justify-content-md-between align-items-center">
      <div class="results__list__item__badge_line">
        🚂 ${colored_tag('Più economico')}
      </div>
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
      <div class="d-flex results__list__item__section_action">
        <div class="ml-md-4">
          <a
            href=""
            @click=${e => {
              e.preventDefault();
              this.step = 1;
              this.updateComplete.then(() => {
                this.initializeMap();
              });
            }}
            ><span class="d-none d-md-inline">Dettagli</span> ></a
          >
        </div>
      </div>
    </div>
  `;
}

const colored_tag = text => {
  return html`
    <p class="results__list__item__badge_line__badge pl-2 pr-2">
      ${text}
    </p>
  `;
};

// <div class=""><p class="fs-30">${props.price}€</p></div>
