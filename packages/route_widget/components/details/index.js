import { html } from 'lit-html';
import chevronRightImage from '../../img/chevron-right.svg';

export function render__details() {
  return html`
    <div class="details">
      <div class="details__background">
        <div class="row">
          <div class="col-12">
            <img src=${chevronRightImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  `;
}
