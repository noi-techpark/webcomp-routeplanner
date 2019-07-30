import { html } from 'lit-html';
import { render__button } from '../generics/buttons/index';
import { render__fromTo } from './components/fromTo';
import clockImage from '../../img/clock.svg';

export function render__search() {
  this.render__fromTo = render__fromTo.bind(this);

  return html`
    <div class="search">
      <div class="row">
        <div class="col-12">
          ${this.render__fromTo()}
        </div>
        <div class="col-12 mt-4 d-flex justify-content-between align-items-center">
          <div class="search__footer">
            <span><img src=${clockImage} alt=""/></span>
            <select name="" id="">
              <option value="">Partenza ora</option>
              <option value="">Partenza alle</option>
              <option value="">Arrivo entro le</option>
              <option value="">Ultimo</option>
            </select>
          </div>
          <div>
            ${render__button('Cambia percorso', () => console.log('default'), this.from && this.to ? '' : 'disabled')}
          </div>
        </div>
      </div>
    </div>
  `;
}
