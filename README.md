# ROUTEPLANNER

CSS styles are transpiled using [Sass](https://sass-lang.com/).

We are using [Webpack](https://webpack.js.org/) for the bundled creation.

[![CI](https://github.com/noi-techpark/webcomp-routeplanner/actions/workflows/ci.yml/badge.svg)](https://github.com/noi-techpark/webcomp-routeplanner/actions/workflows/ci.yml)

## Getting Started

Follow the instruction here below for the development instructions.

### Prerequisites

What things you need to install the software and how to install them:

- Node (global)
- NPM (global)

### Installing

A step by step series of examples that tell you how to get a development env running

Install npm project's dependencies

```
npm install
```

### Development

Start the dev server with

```
npm run  start
```

### Production

Build the widget with the `production` config of Webpack:

```
npm run build
```

The destination for the resulting code will be the `dist` folder, located at the root of the project.

## API Keys

Here maps needs an API key that has to be set in the env variable `HERE_API_KEY` which is set through the [definePlugin](https://webpack.js.org/plugins/define-plugin/)

The EFA/STA api doesn't require API key.

### Attributes

| Attribute name     | Description                                                                       | Example                                      | Notes                                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `destination`      | coordinates of the destination in the following format: "longitude:latitude"      | `destination="11.1604034:46.6684672"`        | the `longitude:latitude` format is the opposite of what you can find on many websites, including google maps that uses the `latitude, longitude` format |
| `destination-name` | display name of the destination                                                   | `destination-name="Terme di Merano, Merano"` |                                                                                                                                                         |
| `disable-car`      | if present it disables the HERE maps car routing integration                      |                                              |                                                                                                                                                         |
| `language`         | two letter key for the language to be used                                        | `language=de`                                | if omitted the widget will use the language of the browser (navigator.language[?s]) if supported. Fallback is `en`                                      |
| `attribution`      | Attribution text for the tiles, can contain html                                  |                                              |                                                                                                                                                         |
| `tiles-url`        | Url for the tiles, see https://leafletjs.com/reference-1.6.0.html#tilelayer       |                                              |                                                                                                                                                         |
| `width`            | Width of the component as css property (es: '500px' or '100%'), default is 100%,  |                                              |                                                                                                                                                         |
| `height`           | Height of the component as css property (es: '500px' or '100%'), deafult is 500px |                                              |                                                                                                                                                         |
|                    |                                                                                   |                                              |                                                                                                                                                         |

## Custom font

Using the `--webcomp-routeplanner-font-family` css variable you can set a custom `font-family`.
[link to MDN doc](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

```html
<style>
  routeplanner-widget {
    --webcomp-routeplanner-font-family: Metal Mania;
  }
</style>
<routeplanner-widget ...attributes></routeplanner-widget>
```

## Authors

- **Luca Fedrizzi** - _Initial work_ - [lcfd](https://github.com/lcfd)
- **Nicolò Pretto** - _more development_ - [npretto](https://github.com/npretto)
