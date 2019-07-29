import { html } from 'lit-html';
import { render__button } from '../generics/buttons/index';
import { render__fromTo } from './components/fromTo';

export function render__search() {
  return html`
    <div class="search">
      <div class="row">
        <div class="col-12">
          ${render__fromTo()}
        </div>
        <div class="col-12 mt-4 d-flex justify-content-between align-items-center">
          <div class="search__footer">
            <span>i</span>
            <select name="" id="">
              <option value="">Partenza ora</option>
              <option value="">Partenza alle</option>
              <option value="">Arrivo entro le</option>
              <option value="">Ultimo</option>
            </select>
          </div>
          <div>
            ${render__button('Cambia percorso', () => console.log('default'), 'disabled')}
          </div>
        </div>
      </div>
    </div>
  `;
}
