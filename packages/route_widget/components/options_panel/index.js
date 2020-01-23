import { html } from 'lit-html';
import clone from 'lodash/clone';

import { render__button } from '../generics/buttons/index';
import { efa_types, here_options } from '../../constants';

function render_filter_element(key) {
  return html`
    <span class="filter_element_container">
      <a
        class="filter_element ${this.temp_travel_options[key] ? 'selected' : ''}"
        @click=${e => {
          this.temp_travel_options[key] = !this.temp_travel_options[key];
          this.requestUpdate();
        }}
      >
        ${key}
      </a>
    </span>
  `;
}

function save() {
  this.travel_options = clone(this.temp_travel_options);
  this.toggle_options_panel();
  this.attemptSearch();
}

function cancel() {
  this.toggle_options_panel();
  this.temp_travel_options = clone(this.travel_options);
}

export function render__options_panel() {
  this.save = save.bind(this);
  this.cancel = cancel.bind(this);

  const render_element = render_filter_element.bind(this);

  return html`
    <div class="options_panel ${this.is_travel_options_panel_open ? 'open' : 'closed'}">
      <p>Puoi escludere alcuni tipi di strada nella ricerca del percorso.</p>

      ${this.car_disabled
        ? ''
        : html`
            <p class="category">In auto, evita:</p>
            <div class="filter_container">
              ${here_options.map(render_element)}
            </div>
          `}

      <p class="category">Coi mezzi pubblici, evita:</p>
      <div class="filter_container">
        ${efa_types.map(render_element)}
      </div>
      <div class="buttons">
        ${render__button('Annulla', this.cancel, 'grey')} ${render__button('Salva', this.save, '')}
      </div>
    </div>
  `;
}
