import { html } from 'lit-html';

export function render__badge(label, type) {
  return html`
    <div class="badge ${type}">
      ${label}
    </div>
  `;
}
