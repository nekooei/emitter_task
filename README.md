# Emitter

Create an implementation of an `Emitter` module which includes the methods `off`, `on`, `once` and `trigger`. Details about the API can be found in the `specification.md` document.

## Development
The `Emitter` module must be written in JavaScript, although it’s up to you which JavaScript specification you wish to use, as the module will be transpiled using [`babel`](https://babeljs.io) before passing through to the [`Karma`](https://karma-runner.github.io) test runner.

All code must be written inside of `src/emitter.js` and use the following command to run the [`Karma`](https://karma-runner.github.io) test runner, which includes all the tests that your implementation must pass before submission.

```bash
npm test
```

**Note: The implementation must not rely on any third-party libraries or [Node.js](https://nodejs.org) modules, as we interested in seeing your coding ability.**

## Requirements
The following implementation requires [Node.js](https://nodejs.org) `v6.4.0`+ to be installed (either system wide or using the likes of [`nvm`](https://github.com/creationix/nvm)). It does not require any global modules, as all required modules are locally installed.

## Setup
Before starting to write the `Emitter` module implementation, first execute the command below to setup all the locally installed modules within the `node_modules` directory.

```bash
npm run setup
```

## On completion
Ensure that all tests defined in the `test` directory are passing and execute the command below to ZIP everything required for submission. Send the `submission.zip` file to the Frosmo representative you were dealing with, by either e-mail or some file uploading service such as Google Drive.

```bash
npm run zip
```

**Note: Please do not upload your final implementation to any public facing repository e.g. GitHub**
