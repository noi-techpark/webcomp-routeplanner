// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { html } from 'lit-html';

export function render__button(label = 'Default', action, status) {
  return html`
    <a
      @click=${e => {
        e.preventDefault();
        action();
      }}
      class="button ${status}"
    >
      ${label}
    </a>
  `;
}
