// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

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
        ${this.t(key)}
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
    <div class="options_panel ${this.is_travel_options_panel_open ? 'open' : 'closed'}" style=${this.getResultsStyle()}>
      <p>${this.t('options_text')}</p>

      ${this.car_disabled
        ? ''
        : html`
            <p class="category">${this.t('options_car_text')}</p>
            <div class="filter_container">
              ${here_options.map(render_element)}
            </div>
          `}

      <p class="category">${this.t('options_public_means_text')}</p>
      <div class="filter_container">
        ${efa_types.map(render_element)}
      </div>
      <div class="buttons">
        ${render__button(this.t('cancel'), this.cancel, 'grey')} ${render__button(this.t('save'), this.save, '')}
      </div>
    </div>
  `;
}
