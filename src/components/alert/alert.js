// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { html } from 'lit-element';
import icon from '../../img/exclamation-triangle.svg';

export function render__alert() {
  return html`
    <div class=${`alert ${this.alert_active ? 'alert--active' : ''}`}>
      <div class="alert__icon">
        <img src=${icon} alt="" />
      </div>
      <div class="alert__message">${this.alert_message}</div>
    </div>
  `;
}
