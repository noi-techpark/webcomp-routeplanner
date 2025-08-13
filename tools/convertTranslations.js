// SPDX-FileCopyrightText: 2024 NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const csv = require('csv-parser');
const fs = require('fs');

const results = [];

/* converts .csv file formatted like | key   | lang1  | lang2 ...
                                     | {key} | {word} | {word} ..
   to a json object like { lang1: {key:word,...},...}
   the resulting object should be put in the translations object in the translations.js file
*/

fs.createReadStream('translations.csv')
  .pipe(csv())
  .on('data', data => results.push(data))
  .on('end', () => {
    const object = {};
    for (word of results) {
      const { key, ...translations } = word;
      for ([lang, value] of Object.entries(translations)) {
        if (!object[lang]) {
          object[lang] = {};
        }
        object[lang][key] = value;
      }
    }

    console.log('-------- final object ----');
    console.log(JSON.stringify(object));
  });
