import html2pdf from 'html2pdf.js';
import { html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import flatMap from 'lodash/flatMap';
import moment from 'moment';
import printJS from 'print-js';
import { CAR, MEANS_ICONS, PUBLIC_TRANSPORT, WALKING, TRIP_COLORS } from '../../constants';
import carImage from '../../img/car.svg';
import changesImage from '../../img/change.svg';
import chevronRightImage from '../../img/chevron-right.svg';
import clockImage from '../../img/clock.svg';
import downloadImage from '../../img/download.svg';
import paymentCardImage from '../../img/payment-card.svg';
import printImage from '../../img/print.svg';
import tripFirstImage from '../../img/trip-first.svg';
import tripLastImage from '../../img/trip-last.svg';
import draggableArrowUp from '../../img/draggable-arrow-up.svg';
import tripStandardImage from '../../img/trip-standard.svg';
import verticalDotsImage from '../../img/vertical-dots.svg';
import walkingImage from '../../img/walking.svg';
import {
  formatDuration,
  formatMinutesDuration,
  formatSecondsDuration,
  last,
  formatApproximateSecondsDuration
} from '../../utilities';
import { render__button } from '../generics/buttons';

const html2pdf_params = {
  margin: 1,
  html2canvas: { scale: 4 },
  jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
};

export function render__details() {
  const tags = [];
  let startTime;
  let endTime;

  let steps = html`
    <div>steps will be here</div>
  `;

  if (this.details_data.type === PUBLIC_TRANSPORT) {
    startTime = this.details_data.startTime;
    endTime = this.details_data.endTime;

    const changes = this.details_data.interchange;

    const walkingTime = this.details_data.legs
      .filter(leg => leg.mode.type === '100')
      .map(leg => parseInt(leg.timeMinute, 10))
      .reduce((a, b) => a + b, 0);

    tags.push({ icon: clockImage, label: formatDuration(this.details_data.duration.split(':')) });
    tags.push({ icon: changesImage, label: `${changes} ${changes > 1 ? this.t('changes') : this.t('change')}` });
    tags.push({ icon: walkingImage, label: formatMinutesDuration(walkingTime) });

    const lastPoint = last(last(this.details_data.legs).points);

    const points = [
      ...this.details_data.legs.map(leg => {
        return {
          time: leg.points[0].dateTime.time,
          place: leg.points[0].name,
          type: leg.type,
          means_desc: leg.type === WALKING ? this.t('by_foot') : leg.mode.name,
          duration: leg.timeMinute
        };
      }),
      { time: lastPoint.dateTime.time, place: lastPoint.name }
    ];
    steps = html`
      ${points.map((point, i) => {
        let tripIcon = tripStandardImage;
        if (i === 0) {
          tripIcon = tripFirstImage;
        } else if (i === points.length - 1) {
          tripIcon = tripLastImage;
        }

        return html`
          <div class="details__body_section__content__element" style="max-height:150px">
            <div class="">
              <p class="details__body_section__content__time">
                ${point.time}
              </p>
            </div>
            <div class="details__body_section__content__middle">
              <div class="d-flex justify-content-center details__body__trip_icon">
                <img src=${tripIcon} alt="" />
              </div>
              ${i < points.length - 1
                ? html`
                    <div
                      class=${`d-flex justify-content-center align-items-center details__body_section__content__vertical_dots
                     ${i === 0 ? `first_element` : ``}`}
                    >
                      ${point.type === WALKING
                        ? html`
                            <img src=${verticalDotsImage} alt="" />
                          `
                        : html`
                            <div
                              class="details__body__line_separator"
                              style=${`border: 1px solid ${TRIP_COLORS[i % TRIP_COLORS.length]}`}
                            ></div>
                          `}
                    </div>
                  `
                : null}
            </div>
            <div class="details__body_section__content__text">
              <p class="details__body_section__content__place">${point.place}</p>
              <div class="details__body_section__content__description">
                ${point.means_desc
                  ? html`
                      <p>
                        <img src=${MEANS_ICONS[point.type]} alt="" />
                      </p>
                      <div class="d-flex flex-column">
                        <p>
                          ${point.means_desc}
                        </p>
                        <p>
                          ${html`
                            (${point.duration} ${this.t('minutes')})
                          `}
                        </p>
                      </div>
                    `
                  : null}
              </div>
            </div>
          </div>
        `;
      })}
    `;
  } else if (this.details_data.type === CAR) {
    startTime = moment(this.details_data.leg[0].maneuver[0].time).format('HH:mm');
    endTime = moment(last(last(this.details_data.leg).maneuver).time).format('HH:mm');

    tags.push({ icon: clockImage, label: formatSecondsDuration(this.details_data.summary.baseTime) });
    tags.push({ icon: carImage, label: `${this.details_data.lengthInKilometers} km` });

    if (this.details_data.summary.flags.includes('tollroad')) {
      tags.push({ icon: paymentCardImage, label: this.t('with_tolls') });
    }

    const maneuvers = flatMap(this.details_data.leg, l => l.maneuver);

    steps = html`
      ${maneuvers.map((m, i) => {
        let icon = tripStandardImage;
        if (i === 0) {
          icon = tripFirstImage;
        }
        if (i === maneuvers.length - 1) {
          icon = tripLastImage;
        }
        return html`
          <div class="details__car_step">
            <div class="details__car_step__icon"><img src="${icon}" /></div>
            <div class="details__car_step__content">
              <div class="details__car_step__content__row">
                <div class="details__car_step__content__description">${unsafeHTML(m.instruction)}</div>
                <div class="details__car_step__content__duration">
                  ${formatApproximateSecondsDuration(m.travelTime)}
                </div>
              </div>
            </div>
          </div>
        `;
      })}
    `;
  }

  const generatePDF = () => {
    return html2pdf()
      .set(html2pdf_params)
      .from(this.shadowRoot.querySelector('.details__body_section').innerHTML);
  };

  const downloadPDF = () => {
    generatePDF().save(`percorso per ${this.destination_place.display_name}`);
  };

  const printPDF = () => {
    generatePDF()
      .outputPdf('blob')
      .then(blob => {
        const url = URL.createObjectURL(blob);
        printJS(url);
      });
  };

  return html`
    <div class="details ${this.details_open ? 'open' : ''}">
      <div class="details__background">
        ${this.isMobile()
          ? html`
              <div
                @click=${() => {
                  this.details_open = !this.details_open;
                }}
                class="draggable"
              >
                <img class="arrow" src=${draggableArrowUp} />
              </div>
            `
          : html``}
        <div class="row details__back_section">
          <div class="col-12 d-flex align-items-center">
            <div
              @click=${() => {
                this.removeTripFromMap();
                this.details_data = undefined;
              }}
              class="details__back_section__content"
            >
              <img src=${chevronRightImage} alt="" />
              <p>
                ${this.t('all_results')}
              </p>
            </div>
          </div>
        </div>

        <div class="row details__header_section">
          <div class="col-12 mt-2">
            <div class="details__header_section__content">
              <div class="details__header_section__timings">
                <p class="details__header_section__timings__label">${this.t('departure_time')}:</p>
                <p class="details__header_section__timings__time">${startTime}</p>
              </div>
              <div class="details__header_section__timings">
                <p class="details__header_section__timings__label">${this.t('arrival_time')}:</p>
                <p class="details__header_section__timings__time">${endTime}</p>
              </div>
            </div>
            <div class="details__header_section__tags">
              ${tags.map(
                ({ icon, label }) => html`
                  <div class="details__header_section__tags__tag">
                    <img src=${icon} alt="" />
                    <p>${label}</p>
                  </div>
                `
              )}
            </div>
          </div>
        </div>
        <div class="details__body_section">
          <div class="details__body_section__content">
            ${steps}
          </div>
        </div>
        <div class="details__footer_section">
          ${render__button(
            html`
              <img src="${downloadImage}" alt="" /> ${this.t('download_pdf')}
            `,
            downloadPDF,
            'grey'
          )}
          ${render__button(
            html`
              <img src="${printImage}" alt="" /> ${this.t('print')}
            `,
            printPDF,
            'grey'
          )}
        </div>
      </div>
    </div>
  `;
}
