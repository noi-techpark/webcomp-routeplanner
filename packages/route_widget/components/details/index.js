import { html } from 'lit-html';
import chevronRightImage from '../../img/chevron-right.svg';
import carImage from '../../img/car.svg';
import tripFirstImage from '../../img/trip-first.svg';
import tripStandardImage from '../../img/trip-standard.svg';
import tripLastImage from '../../img/trip-last.svg';
import verticalDotsImage from '../../img/vertical-dots.svg';

import { render__badge } from '../generics/badge';

export function render__details() {
  console.log(this.details_data);

  return html`
    <div class="details">
      <div class="details__background">
        <div
          class="row details__back_section"
          @click=${() => {
            this.details_data = undefined;
          }}
        >
          <div class="col-12 d-flex align-items-center">
            <div class="details__back_section__content">
              <img src=${chevronRightImage} alt="" />
              <p>
                ${this.details_data.type === 'auto' ? 'Dettagli tragitto in auto' : 'Dettagli tragitto in treno'}
              </p>
            </div>
          </div>
        </div>

        <div class="row details__header_section mt-2">
          <div class="col-12">
            <div class="details__header_section__content">
              <div class="d-flex mt-1">
                ${this.details_data.tags.map(o => {
                  if (o === 'eco') {
                    return html`
                      ${render__badge('PIÚ ECONOMICO', 'green')}
                    `;
                  } else if (o === 'faster') {
                    return html`
                      ${render__badge('PIÙ VELOCE', 'yellow')}
                    `;
                  }
                })}
              </div>

              <p class="details__header_section__timings mt-2">${this.details_data.timings}</p>

              <div class="details__header_section__description mt-2">
                ${this.details_data.type === 'auto'
                  ? html`
                      <img src=${carImage} alt="" />
                      <p class="ml-2">${this.details_data.description}</p>
                    `
                  : html`
                      <p>${this.details_data.description}</p>
                      ${render__tooltip(
                        '',
                        html`
                          <h3>Prezzo indicativo per un adulto</h3>
                          <p>La cifra mostrata si riferisce ad un biglietto di sola andata per un adulto.</p>
                        `,
                        infoCircleImage,
                        'left'
                      )}
                    `}
              </div>
              <div class="details__header_section__show_others mt-4">
                <a href="/">Visualizza altri orari ></a>
              </div>
            </div>
          </div>
        </div>
        <div class="details__body_section">
          <!-- <div class="col-12"> -->
          <div class="details__body_section__content">
            ${this.details_data.trip.map((o, i) => {
              let tripIcon = tripStandardImage;
              if (i === 0) {
                tripIcon = tripFirstImage;
              } else if (i === this.details_data.trip.length - 1) {
                tripIcon = tripLastImage;
              }
              return html`
                <div class="row details__body_section__content__element">
                  <div class="col">
                    <p class="details__body_section__content__time">
                      ${o.time}
                    </p>
                  </div>
                  <div class="col details__body_section__content__middle">
                    <div class="d-flex justify-content-center">
                      <img src=${tripIcon} alt="" />
                    </div>
                    ${i < this.details_data.trip.length - 1
                      ? html`
                          <div
                            class=${`d-flex justify-content-center align-items-center details__body_section__content__vertical_dots
                             ${i === 0 ? `first_element` : ``}`}
                          >
                            <img src=${verticalDotsImage} alt="" />
                          </div>
                        `
                      : null}
                  </div>
                  <div class="col-8">
                    <p class="details__body_section__content__place">${o.place}</p>
                    <div class="details__body_section__content__description">
                      <p>
                        ${o.means_desc}
                      </p>
                    </div>
                  </div>
                </div>
              `;
            })}
            <!-- </div> -->
          </div>
        </div>
        <div class="row details__footer_section">
          <div class="col-12">
            <div class="">
              section
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
