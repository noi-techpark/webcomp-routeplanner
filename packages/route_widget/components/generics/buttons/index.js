import { html } from 'lit-html';

export function render__button(label = 'Default', action, status) {
  return html`
    <a
      @click=${e => {
        e.preventDefault();
        action();
      }}
      class="button ${status}"
    >
      ${label}
    </a>
  `;
}
