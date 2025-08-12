// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { html } from 'lit-html';
import chevronRightImage from '../../../img/chevron-right.svg';
import { formatSecondsDuration, HERETripToPolylines } from '../../../utilities';
import { render__badge } from '../../generics/badge';
import { MEANS_ICONS, CAR } from '../../../constants';

export function render__carListElement(trip) {
  const label = trip.label.join(' - ');

  return html`
    <div
      class="search__results__listElement d-flex align-items-center justify-content-between"
      @click=${() => {
        this.details_data = { type: CAR, ...trip };
        this.details_open = false;
        this.removeTripToMapHover();
        this.addTripToMap(HERETripToPolylines(trip));
      }}
      @mouseenter=${() => {
        this.removeTripToMapHover();
        this.addTripToMapHover(HERETripToPolylines(trip));
      }}
      @mouseleave=${() => this.removeTripToMapHover()}
    >
      <div class="search__results__listElement__details">
        <div class="search__results__listElement__badges">
          ${trip.is_fastest ? render__badge(this.t('faster_badge'), 'yellow') : ''}
        </div>
        <div class="search__results__listElement__times">
          <p class="search__results__listElement__range">
            ${trip.lengthInKilometers} km
          </p>
          <p class="search__results__listElement__range">${formatSecondsDuration(trip.summary.baseTime)}</p>
        </div>
        <div class="search__results__listElement__transports"><img src=${MEANS_ICONS[CAR]} alt="car" /> ${label}</div>
      </div>
      <div class="search__results__listElement__chevron_container">
        <img src=${chevronRightImage} alt="" />
      </div>
    </div>
  `;
}
