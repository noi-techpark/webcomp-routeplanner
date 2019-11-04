import { html } from 'lit-html';
import { MEANS_ICONS } from '../../../means_icons';
import chevronRight from '../../../img/chevron-right-gray.svg';

export default function render__leg_badge(leg, has_next = false) {
  let badge;

  switch (leg.type) {
    case 'train':
      badge = html`
        <span
          class="search__results__listElement__transports__item search__results__listElement__transports__item--with-border"
        >
          <img src=${MEANS_ICONS[leg.type]} alt="${leg.type}" />
          <span>${leg.mode.trainType} ${leg.mode.number}</span>
        </span>
      `;
      break;
    case 'bus':
      badge = html`
        <span
          class="search__results__listElement__transports__item search__results__listElement__transports__item--with-border"
        >
          <img src=${MEANS_ICONS[leg.type]} alt="${leg.type}" />
          <span>${leg.mode.name}</span>
        </span>
      `;
      break;
    default:
      badge = html`
        <span class="search__results__listElement__transports__item ">
          <img src=${MEANS_ICONS[leg.type]} alt="${leg.type}" />
          <span>${leg.timeMinute}</span>
        </span>
      `;
  }

  return html`
    ${badge}
    ${has_next
      ? html`
          <img src="${chevronRight}" />
        `
      : ''}
  `;
}
