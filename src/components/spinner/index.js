// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { html } from 'lit-element';

export const render_spinner = () => {
  return html`
    <style>
      .spinner {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
      }
      .spinner div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 51px;
        height: 51px;
        margin: 6px;
        border: 6px solid #fff;
        border-radius: 50%;
        animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
      }
      .spinner div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .spinner div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .spinner div:nth-child(3) {
        animation-delay: -0.15s;
      }
      @keyframes spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `;
};
