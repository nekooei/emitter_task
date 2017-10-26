# Emitter

Create an implementation of an `Emitter` module. The implementation must include the following functions:
* `off`
* `on`
* `once`
* `trigger`

For more information about the API, see `specification.md`.

## Purpose
The purpose of the task is to use:

* git commands, such as `git clone`
* Node.js commands, such as e.g. `npm test`
* [`babel`](https://babeljs.io) (also, to understand the concept of "transpiling" from ES2015+ to ES5)
* [`Karma`](https://karma-runner.github.io) for testing JavaScript code
* A pre-defined specification for creating a code implementation
* The latest JavaScript specification. such as ES2015+ (this is optional)

## Development
You must write the `Emitter` module in JavaScript. However, the JavaScript specification you use is up to you as the module will automatically be transpiled using [`babel`](https://babeljs.io) before passing it to the [`Karma`](https://karma-runner.github.io) test runner.

Write all your code in the `src/emitter.js` file and use the following command to run the [`Karma`](https://karma-runner.github.io) test runner (which includes all the tests that your implementation must pass before submission):


```bash
npm test
```

**Note: The implementation must not rely on any third-party libraries or [Node.js](https://nodejs.org) modules.**

## Requirements
To create the implementation, you must have [Node.js](https://nodejs.org) `v6.4.0`+ installed (either system-wide or through [`nvm`](https://github.com/creationix/nvm) or similar). No global modules are required as all the necessary modules are locally installed.


## Setup
Before implementing the `Emitter` module, you must execute the following command to set up all the locally installed modules within the `node_modules` directory:

```bash
npm run setup
```

## On completion
Ensure that **all** tests defined in the `test` directory are passing and execute the following command to ZIP everything required for submission:

```bash
npm run zip
```

Upload the `submission.zip` file to a file sharing service such as Google Drive or Dropbox and provide the link to your Frosmo contact via e-mail.

**Note: Do NOT upload your final implementation to any public repository such as GitHub.**