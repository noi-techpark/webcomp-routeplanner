import { html } from 'lit-html';

export const RouteListItem = props => {
  const { time, text, duration } = props;
  return html`
    <div class="details_sidebar__body__list_item mt-2 d-flex">
      <div class="details_sidebar__body__list_item__hour_container position-relative">
        <div>${time}</div>
        <div class="details_sidebar__body__list_item__dotted_line"></div>
      </div>
      <div class="ml-2">
        <div>${text}</div>
        <div class="mb-5">${duration}</div>
      </div>
    </div>
  `;
};
