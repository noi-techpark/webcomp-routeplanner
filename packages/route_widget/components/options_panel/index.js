import { html } from 'lit-html';
import { render__button } from '../generics/buttons/index';

function render_filter_element(key) {
  return html`
    <a
      class="filter_element ${this.travel_options[key] ? 'selected' : ''}"
      @click=${e => {
        this.travel_options[key] = !this.travel_options[key]; // ? false : true;
        this.requestUpdate();
      }}
    >
      ${key}
    </a>
  `;
}

export function render__options_panel() {
  console.log('this.travel_options', this.travel_options);
  const render_element = render_filter_element.bind(this);

  const here_types = ['tollroad', 'motorway', 'boatFerry', 'railFerry', 'tunnel', 'dirtRoad'];
  const efa_types = ['funicolar', 'train', 'bus'];

  console.log(this);
  return html`
    <div class="options_panel ${this.is_travel_options_panel_open ? 'open' : 'closed'}">
      <p>Puoi escludere alcuni tipi di strada nella ricerca del percorso.</p>

      ${this.car_disabled
        ? ''
        : html`
            <p>In auto, evita:</p>
            <div class="filter_container">
              ${here_types.map(render_element)}
            </div>
          `}

      <p>Coi mezzi pubblici, evita:</p>
      <div class="filter_container">
        ${efa_types.map(render_element)}
      </div>
    </div>
  `;
}
