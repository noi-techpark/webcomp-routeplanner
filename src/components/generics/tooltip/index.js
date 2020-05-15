import { html } from 'lit-html';

export function render__tooltip(label, text, icon, position) {
  return html`
    <div class="tooltip">
      ${icon
        ? html`
            <img class="tooltip__icon" src=${icon} alt="" />
          `
        : null}
      ${label}
      <div class=${`tooltiptext ${position}`}>${text}</div>
    </div>
  `;
}
