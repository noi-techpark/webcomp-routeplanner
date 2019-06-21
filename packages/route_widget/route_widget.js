import { html, LitElement } from 'lit-element';
import { BoxInputs } from './components/boxInputs';
import { BoxParameters } from './components/boxParameters';
import { Header } from './components/header';
import { observed_properties } from './observed_properties';
import style from './scss/main.scss';
import { getStyle } from './utilities';

class RoutePlanner extends LitElement {
  constructor() {
    super();
    this.Header = Header.bind(this);
    this.BoxParameters = BoxParameters.bind(this);
    this.BoxInputs = BoxInputs.bind(this);

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
        ${this.font_family ? `.routeplanner { font-family: ${this.font_family} }` : ''}
      </style>
      <div class="routeplanner-widget">
        ${this.Header()} ${this.BoxParameters()} ${this.BoxParameters()}
      </div>
    `;
  }
}

if (!window.customElements.get('routeplanner-widget')) {
  window.customElements.define('routeplanner-widget', RoutePlanner);
}
