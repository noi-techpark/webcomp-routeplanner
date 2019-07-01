import { html } from 'lit-element';

export const BoxInputs = props => {
  return html`
    <div class="box_inputs mt-md-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div>
              <label class="box_inputs__input_label fs-20" for="going_adddress_input">Partenza</label>
              <input placeholder="Partenza" class="box_input__input" id="going_adddress_input" type="text" />
            </div>
            <div class="mt-md-4">
              <label class="box_inputs__input_label fs-20" for="return_address_input">Arrivo</label>
              <input placeholder="Arrivo" class="box_input__input" id="return_address_input" type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
