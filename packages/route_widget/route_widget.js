import { html, LitElement } from 'lit-element';
// import style__buttons from './scss/buttons.scss';
import { getStyle } from './utilities';
import style from './scss/main.scss';
import { observed_properties } from './observed_properties';

class RoutePlanner extends LitElement {
  constructor() {
    super();
    // this.Header = Header.bind(this);

    /** Observed values */
    // this.chart_1_value = 0;
  }

  static get properties() {
    return observed_properties;
  }

  async firstUpdated() {}

  render() {
    return html`
      <style>
        ${getStyle(style)}
      </style>
      <div class="routeplanner-widget">
        Routeplanner initial scaffolding
      </div>
    `;
  }
}
// ${this.Header()}

if (!window.customElements.get('routeplanner-widget')) {
  window.customElements.define('routeplanner-widget', RoutePlanner);
}
