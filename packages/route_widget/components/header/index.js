import { html } from 'lit-element';

export const Header = props => {
  return html`
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h1 class="fs-42">Come arrivare alle <strong>Terme di Merano</strong></h1>
            <p class="fs-16 d-none d-md-block">Piazza Terme, 9, 39012 Merano (BZ)</p>
          </div>
        </div>
      </div>
    </div>
  `;
};
