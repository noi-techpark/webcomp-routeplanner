// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { html } from 'lit-html';

export function render__badge(label, type) {
  return html`
    <div class="badge ${type}">
      ${label}
    </div>
  `;
}
