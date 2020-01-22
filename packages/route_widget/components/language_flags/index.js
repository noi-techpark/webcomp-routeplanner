import { html } from 'lit-element';

import flagIt from '../../img/flag_it.svg';
import flagDe from '../../img/flag_de.svg';
import flagEn from '../../img/flag_en.svg';

export function render__language_flags() {
  return html`
    <div class="language_flags">
      <img
        src=${flagIt}
        alt="italiano"
        class=${this.language === 'it' ? 'active' : ''}
        @click=${() => this.switch_language('it')}
      />
      <img
        src=${flagDe}
        alt="deutsch"
        class=${this.language === 'de' ? 'active' : ''}
        @click=${() => this.switch_language('de')}
      />
      <img
        src=${flagEn}
        alt="english"
        class=${this.language === 'en' ? 'active' : ''}
        @click=${() => this.switch_language('en')}
      />
    </div>
  `;
}
