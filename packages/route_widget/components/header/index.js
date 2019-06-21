import { html } from 'lit-element';

import { moutain_illustration } from '../../img/moutain_illustration.svg.js';
import { sudtirol_logo } from '../../img/sudtirol_logo.svg.js';

export const Header = props => {
  return html`
    <div class="header">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="header__logo">
              <div
                class="header__logo_image"
                style="background-image: url(${`https://www.greenmobility.bz.it/typo3conf/ext/interho/Resources/Public/Img/logo.png`})"
              ></div>
            </div>
            <div class="header__title_container mt-3">
              <h1 class="fs-h1 color-white mt-5">Tutti i dati delle colonnine</h1>
            </div>
            ${sudtirol_logo}
          </div>
          ${moutain_illustration}
        </div>
      </div>
    </div>
  `;
};
