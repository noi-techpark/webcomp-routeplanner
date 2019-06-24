import { html } from 'lit-html';

export function DetailsTopbar(props) {
  return html`
    <div class="details_topbar">
      <p
        @click=${() => {
          this.step = 0;
        }}
      >
        < Indietro
      </p>
    </div>
  `;
}
