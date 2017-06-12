# Emitter
Create an implmentation of an `Emitter` module which includes the public methods `off`, `on`, `once` and `trigger`. Details about the API sepcification can be found in the `specification.md` document. It includes examples and details about the required functions and arguments.

## Requirements
The following implmentation requires Node.js `v6.4.0` or above to be installed (either system wide or using the likes of [`nvm`](https://github.com/creationix/nvm)). It does not require any global modules, as everything is locally installed within the `node_modules` directory.

## Setup
Before starting to write the `Emitter` module implementation, first execute the command below to setup all locally required modules within the `node_modules` directory.

```bash
npm run setup
```

## Development/Testing
When developing the implmentation inside of `src/emitter.js`, use the command to execute the [`Karma`](https://karma-runner.github.io) test runner, that periodically watches for changes that are made to any files within the directory.

### Souce code
The `Emitter` module must be written in JavaScript, but it's entirely up to you which JavaScript specification you wish to use, as the module will be transpiled using [`babel`](https://babeljs.io) before passing to the [`Karma`](https://karma-runner.github.io) test runner.

```bash
npm test
```

## On completion
Ensure that all tests defined in the `test` directory are passing and execute the command below to ZIP everything required for submission. Send the `submission.zip` file to the Frosmo representative you were dealing with.

```bash
npm run zip
```
