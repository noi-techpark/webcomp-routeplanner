# ROUTEPLANNER

This project contains all the webcomponents of the greenmobility project.
You can find all the information about it on the official website [https://www.greenmobility.bz.it/it/](https://www.greenmobility.bz.it/it/).

## Why

IDM wants to break up, in reusable and independent components, its website. Using those webcomponents a developer can integrate every website with ready to use and up to date data.

## Choices

To create more structured and mantainable webcomponents we have used [Polymer](https://www.polymer-project.org/), more specifically the [lit-element](https://lit-element.polymer-project.org/) implementation.

Using [lerna](https://github.com/lerna/lerna) we can manage all the components as monolith repository but splitted in packages.

So the project can benefit of:

- a better project structure
- a better dependencies management
- a better way to pack up components
- and every component is isolated with it's own dependencies

CSS styles are transpiled using [Sass](https://sass-lang.com/).

We are usign [Webpack](https://webpack.js.org/) for the bundle creation.

## Getting Started

Follow the instruction here below for the development instructions.

### Prerequisites

What things you need to install the software and how to install them:

- Node (global)
- Yarn (global)
- Lerna (global)

### Installing

A step by step series of examples that tell you how to get a development env running

Install yarn project's dependencies

```
yarn
```

To install all the dependencies of the packages:

```
lerna bootstrap
```

Because they are managed using Lerna.

### Developement

Start the lerna pipeline with:

```
yarn wc
```

This will watch the files in every package configured in the right way to create a Webpack bundle.

### Production

Build all widgets using a `production` config of Webpack:

```
yarn bc
```

The destination for the resulting code will be the `dist` folder, located at the root of the project.

## Development results

To see the components in action while working on, go to the folder `work` in the main folder and run:

```
sh serve.sh
```

This will serve the "work in progress" website on [http://0.0.0.0:8000/](http://0.0.0.0:8000/) url.

## Deployment

To deploy the webcomponents:

- Use the snippets that you will find in the served `work` folder, this will use an internal CDN.
- Take the production bundle created with the command `yarn bc` and use it as a normal javascrip script.

In any case I suggest you to check the snippets of the first point.

## Running the tests

TODO

### Break down into end to end tests

TODO

### And coding style tests

TODO

## Contributing

## Authors

- **Luca Fedrizzi** - _Initial work_ - [fedriz](https://github.com/fedriz)

## License

TODO
