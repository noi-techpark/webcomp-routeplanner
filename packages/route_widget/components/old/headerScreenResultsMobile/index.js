// HeaderScreenResults
import { html } from 'lit-element';

export function HeaderScreenResults(props) {
  return html`
    <div class="header_screen_results">
      <div class="container">
        <div class="row pt-2">
          <div class="col-2">
            🔙
          </div>
          <div class="col-8">
            <p class="header_screen_results__title">Via Roberto da Sanseverino</p>
            <p class="header_screen_results__title">Terme di Merano</p>
          </div>
          <div class="col-2">
            ⚙️
          </div>
        </div>
        <div class="row">
          <div class="offset-2 col-8">
            <p>
              Andata / Ritorno
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}
