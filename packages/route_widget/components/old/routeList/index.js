import { html } from 'lit-html';
import { RouteListItem } from '../detailsSidebar/route_list_item';

export function RouteList(params) {
  return html`
    <div class="details_sidebar__body p-3">
      ${RouteListItem({
        time: '12:40',
        text: 'Cammina fino alla stazione dei treni di Trento',
        duration: '(10min)'
      })}
      ${RouteListItem({
        time: '12:40',
        text: 'Cammina fino alla stazione dei treni di Trento',
        duration: '(10min)'
      })}
      ${RouteListItem({
        time: '12:40',
        text: 'Cammina fino alla stazione dei treni di Trento',
        duration: '(10min)'
      })}
      ${RouteListItem({
        time: '12:40',
        text: 'Cammina fino alla stazione dei treni di Trento',
        duration: '(10min)'
      })}
    </div>
  `;
}
