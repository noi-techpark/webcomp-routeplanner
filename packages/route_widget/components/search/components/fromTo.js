import { html } from 'lit-html';

export function render__fromTo() {
  return html`
    <div class="fromTo d-flex">
      <div class="fromTo__graphics">
        g
      </div>
      <div class="fromTo__inputs">
        <input type="text" />
        <input type="text" />
      </div>
      <div class="fromTo__button">
        r
      </div>
    </div>
  `;
}
