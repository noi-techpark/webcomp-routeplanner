import { html } from 'lit-element';

export const FirstScreenFooter = props => {
  return html`
    <div class="first_screen_footer">
      <div class="container">
        <div class="row">
          <div class="col-12 mt-5 d-flex justify-content-end">
            <button>Cerca percorso</button>
          </div>
        </div>
      </div>
    </div>
  `;
};
