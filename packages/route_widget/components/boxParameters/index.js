import { html } from 'lit-element';

export const BoxParameters = props => {
  return html`
    <div class="box_parameters mt-3">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="box_parameters__container p-3">
              <div class="row">
                <div class="col-12 d-flex">
                  <div>
                    <select name="" id="">
                      <option value="">Andata e ritorno</option>
                      <option value="">Andata</option>
                    </select>
                  </div>
                  <div class="ml-3">
                    <select name="" id="">
                      <option value="">Orario di partenza</option>
                      <option value="">Orario d'arrivo</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row mt-3 mb-3">
                <div class="col-12">
                  <div class="box_parameters__dotted_line"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex">
                  <div>
                    <label class="box_parameters__input_label fs-14" for="going_input">Andata</label>
                    <input id="going_input" type="date" />
                  </div>
                  <div class="ml-3">
                    <label class="box_parameters__input_label fs-14" for="return_input">Ritorno</label>
                    <input id="return_input" type="date" />
                  </div>
                  <div class="ml-5">
                    <label class="box_parameters__input_label fs-14">Passeggeri</label>
                    <div class="d-flex">
                      <button>-</button>
                      <p class="ml-2">2</p>
                      <button class="ml-2">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
