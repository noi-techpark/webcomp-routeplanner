import { html } from 'lit-element';

export const colored_tag = text => {
  return html`
    🚂
    <p class="results__list__item__badge_line__badge pl-2 pr-2">
      ${text}
    </p>
  `;
};
