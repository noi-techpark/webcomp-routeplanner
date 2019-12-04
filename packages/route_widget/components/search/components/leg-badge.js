import { html } from 'lit-html';
import { MEANS_ICONS, WALKING, TRAIN, BUS } from '../../../constants';
import chevronRight from '../../../img/chevron-right-gray.svg';

export default function render__leg_badge(leg, has_next = false) {
  let description = '';

  console.log(leg);
  switch (leg.type) {
    case TRAIN:
      description = `${leg.mode.trainType}${leg.mode.number}`;
      break;
    case BUS:
      description = `${leg.mode.name}`;
      break;
    case WALKING:
      description = `${leg.timeMinute}`;
      break;
    default:
      description = `${leg.mode.name && leg.mode.name.length > 0 ? leg.mode.name : leg.timeMinute}`;
  }

  return html`
    <span
      class="search__results__listElement__transports__item ${leg.type !== WALKING
        ? 'search__results__listElement__transports__item--with-border'
        : ''}"
    >
      ${MEANS_ICONS[leg.type] &&
        html`
          <img src=${MEANS_ICONS[leg.type]} alt="${leg.type}" />
        `}
      <span>${description}</span>
    </span>
    ${has_next
      ? html`
          <img src="${chevronRight}" />
        `
      : ''}
  `;
}
