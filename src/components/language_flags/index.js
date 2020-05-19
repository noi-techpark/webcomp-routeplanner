import { html } from 'lit-element';

import flagIt from '../../img/flag_it.svg';
import flagDe from '../../img/flag_de.svg';
import flagEn from '../../img/flag_en.svg';
import { LANGUAGES } from '../../constants';

export function render__language_flags() {
  return html`
    <div class="language_flags">
      <img
        src=${flagIt}
        alt="italiano"
        class=${this.language === LANGUAGES.IT ? 'active' : ''}
        @click=${() => this.switch_language(LANGUAGES.IT)}
      />
      <img
        src=${flagDe}
        alt="deutsch"
        class=${this.language === LANGUAGES.DE ? 'active' : ''}
        @click=${() => this.switch_language(LANGUAGES.DE)}
      />
      <img
        src=${flagEn}
        alt="english"
        class=${this.language === LANGUAGES.EN ? 'active' : ''}
        @click=${() => this.switch_language(LANGUAGES.EN)}
      />
    </div>
  `;
}
