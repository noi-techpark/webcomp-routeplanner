# ROUTEPLANNER

CSS styles are transpiled using [Sass](https://sass-lang.com/).

We are using [Webpack](https://webpack.js.org/) for the bundle creation.

## Getting Started

Follow the instruction here below for the development instructions.

### Prerequisites

What things you need to install the software and how to install them:

- Node (global)
- Yarn (global)

### Installing

A step by step series of examples that tell you how to get a development env running

Install yarn project's dependencies

```
yarn
```

### Development

Start the dev server with

```
yarn start
```

### Production

Build all widgets using a `production` config of Webpack:

```
yarn build
```

The destination for the resulting code will be the `dist` folder, located at the root of the project.

## Development results

To see the components in action while working on, go to the folder `work` in the main folder and run:

```
sh serve.sh
```

This will serve the "work in progress" website on [http://0.0.0.0:8000/](http://0.0.0.0:8000/) url.

## API Keys

Here maps needs an API key that has to be set in the env variable `HERE_API_KEY` which is set through the [definePlugin](https://webpack.js.org/plugins/define-plugin/)

The EFA/STA api doesn't require API keys.

## How to embed on a web page

TODO

### Attributes

| Attribute name     | Description                                                                  | Example                                      | Notes                                                                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `destination`      | coordinates of the destination in the following format: "longitude:latitude" | `destination="11.1604034:46.6684672"`        | the `longitude:latitude` format is the opposite of what you can find on many websites, including google maps that uses the `latitude, longitude` format |
| `destination-name` | display name of the destination                                              | `destination-name="Terme di Merano, Merano"` |                                                                                                                                                         |
| `disable-car`      | if present it disables the HERE maps car routing integration                 |                                              |                                                                                                                                                         |
| `language`         | two letter key for the language to be used                                   | `language=de`                                | if omitted the widget will use the language of the browser (navigator.language[?s]) if supported. Fallback is `en`                                      |
|                    |                                                                              |                                              |                                                                                                                                                         |

## Running the tests

TODO

### Break down into end to end tests

TODO

### And coding style tests

TODO

## Contributing

## Authors

- **Luca Fedrizzi** - _Initial work_ - [fedriz](https://github.com/fedriz)
- **Nicolò Pretto** - _more development_ - [npretto](https://github.com/npretto)

## License

TODO
