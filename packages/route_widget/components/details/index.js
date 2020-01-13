import html2pdf from 'html2pdf.js';
import { html } from 'lit-element';
import printJS from 'print-js';
import { MEANS_ICONS, WALKING, PUBLIC_TRANSPORT, PUBLIC_TRANSPORT_TAB, CAR } from '../../constants';
import carImage from '../../img/car.svg';
import clockImage from '../../img/clock.svg';
import changesImage from '../../img/change.svg';
import walkingImage from '../../img/walking.svg';
import chevronRightImage from '../../img/chevron-right.svg';
import downloadImage from '../../img/download.svg';
import printImage from '../../img/print.svg';
import paymentCardImage from '../../img/payment-card.svg';
import tripFirstImage from '../../img/trip-first.svg';
import tripLastImage from '../../img/trip-last.svg';
import tripStandardImage from '../../img/trip-standard.svg';
import verticalDotsImage from '../../img/vertical-dots.svg';
import { formatDuration, last, formatMinutesDuration, formatSecondsDuration } from '../../utilities';
import { render__badge } from '../generics/badge';
import { render__button } from '../generics/buttons';
import moment from 'moment';

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
    // TODO: singular/plural version
    tags.push({ icon: changesImage, label: `${changes} cambi` });
    tags.push({ icon: walkingImage, label: formatMinutesDuration(walkingTime) });

    const lastPoint = last(last(this.details_data.legs).points);

    const points = [
      ...this.details_data.legs.map(leg => {
        return {
          time: leg.points[0].dateTime.time,
          place: leg.points[0].name,
          type: leg.type,
          means_desc: leg.type === WALKING ? `A piedi (${leg.timeMinute} minuti)` : leg.mode.name
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
          <div class="row details__body_section__content__element" style="max-height:150px">
            <div class="col-2 col-md">
              <p class="details__body_section__content__time">
                ${point.time}
              </p>
            </div>
            <div class="col-3 col-md details__body_section__content__middle">
              <div class="d-flex justify-content-center">
                <img src=${tripIcon} alt="" />
              </div>
              ${i < points.length - 1
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
            <div class="col-6 col-md-8">
              <p class="details__body_section__content__place">${point.place}</p>
              <div class="details__body_section__content__description">
                ${point.means_desc
                  ? html`
                      <p>
                        <img src=${MEANS_ICONS[point.type]} alt="" />
                      </p>
                      <p>
                        ${point.means_desc}
                      </p>
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

    tags.push({ icon: clockImage, label: formatSecondsDuration(this.details_data.summary.trafficTime) });
    tags.push({ icon: carImage, label: `${this.details_data.lengthInKilometers} km` });

    if (this.details_data.summary.flags.includes('tollroad')) {
      tags.push({ icon: paymentCardImage, label: 'Con pedaggi' });
    }
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
    <div class="details">
      <div class="details__background">
        <div
          class="row details__back_section"
          @click=${() => {
            this.removeTripFromMap();
            this.details_data = undefined;
          }}
        >
          <div class="col-12 d-flex align-items-center">
            <div class="details__back_section__content">
              <img src=${chevronRightImage} alt="" />
              <p>
                Tutti i risultati
              </p>
            </div>
          </div>
        </div>

        <div class="row details__header_section">
          <div class="col-12 mt-2">
            <div class="details__header_section__content">
              <div class="details__header_section__timings">
                <p class="details__header_section__timings__label">Partenza:</p>
                <p class="details__header_section__timings__time">${startTime}</p>
              </div>
              <div class="details__header_section__timings">
                <p class="details__header_section__timings__label">Arrivo:</p>
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
              <img src="${downloadImage}" alt="" /> Scarica PDF
            `,
            downloadPDF,
            'grey'
          )}
          ${render__button(
            html`
              <img src="${printImage}" alt="" /> Stampa
            `,
            printPDF,
            'grey'
          )}
        </div>
      </div>
    </div>
  `;
}
