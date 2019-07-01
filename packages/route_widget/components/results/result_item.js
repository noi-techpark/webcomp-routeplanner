import { html } from 'lit-html';

export function resultItem(props) {
  console.log(this.step);

  return html`
    <div class="results__list__item p-3 d-flex flex-wrap justify-content-between align-items-center">
      <div class="results__list__item__badge_line">
        🚂
        <p class="results__list__item__badge_line__badge pl-2 pr-2">
          Più economico
        </p>
      </div>
      <div class="d-flex mt-2 flex-wrap">
        <div class="d-flex align-items-center">
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
        <div class="results__list__item__change_line d-flex mt-2">
          <p>❌ ❌</p>
          <p class="ml-3">100km, 3 Cambi</p>
        </div>
      </div>
      <div class="d-flex">
        <div class="ml-4">
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

// <div class=""><p class="fs-30">${props.price}€</p></div>
