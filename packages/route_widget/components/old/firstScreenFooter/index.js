import { html } from 'lit-element';

export function FirstScreenFooter(props) {
  return html`
    <div class="first_screen_footer">
      <div class="container">
        <div class="row">
          <div class="col-12 mt-3 mt-md-5 d-flex justify-content-end">
            <button class="first_screen_footer__search_button">Cerca percorso</button>
          </div>
          <div class="col-12 mt-3 mt-md-5 d-flex d-md-none justify-content-end">
            <button class="first_screen_footer__expand_button">X</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
