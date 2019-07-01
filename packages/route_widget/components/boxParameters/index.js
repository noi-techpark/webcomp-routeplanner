import { html } from 'lit-element';

export const BoxParameters = props => {
  return html`
    <div class="box_parameters mt-3">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="box_parameters__container p-md-3">
              <div class="row">
                <div class="col-12 d-md-flex">
                  <div>
                    <select class="box_parameters__select" class="" name="" id="">
                      <option value="">Andata e ritorno</option>
                      <option value="">Andata</option>
                    </select>
                  </div>
                  <div class="d-none d-md-block ml-md-3">
                    <select name="" id="">
                      <option value="">Orario di partenza</option>
                      <option value="">Orario d'arrivo</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row mt-md-3 mb-md-3">
                <div class="col-12">
                  <div class="box_parameters__dotted_line"></div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex">
                  <div class="box_parameters__going_return_container ">
                    <label class="box_parameters__input_label fs-14 d-none d-md-block" for="going_input">Andata</label>
                    <input class="box_parameters__input_box" id="going_input" type="date" />
                  </div>
                  <div class="box_parameters__going_return_container ml-md-3">
                    <label class="box_parameters__input_label fs-14 d-none d-md-block" for="return_input"
                      >Ritorno</label
                    >
                    <input class="box_parameters__input_box" id="return_input" type="date" />
                  </div>
                  <div class="d-none ml-md-5">
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
