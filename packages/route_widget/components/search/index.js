import { html } from 'lit-html';
import { render__button } from '../generics/buttons/index';

export function render__search() {
  return html`
    <div class="search">
      <div class="row">
        <div class="col-12 d-flex justify-content-between align-items-center">
          <div>
            Partenza ora
          </div>
          <div>
            ${render__button('Cambia percorso', () => console.log('default'), 'disabled')}
          </div>
        </div>
      </div>
    </div>
  `;
}
