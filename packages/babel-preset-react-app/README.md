# babel-preset-inferno-app

This package includes the Babel preset used by [Create Inferno App](https://github.com/infernojs/create-inferno-app).<br>
Please refer to its documentation:

- [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React/Inferno App.

## Usage in Create Inferno App Projects

The easiest way to use this configuration is with [Create Inferno App](https://github.com/infernojs/create-inferno-app), which includes it by default. **You don’t need to install it separately in Create Inferno App projects.**

## Usage Outside of Create Inferno App

If you want to use this Babel preset in a project not built with Create Inferno App, you can install it with the following steps.

First, [install Babel](https://babeljs.io/docs/setup/).
Then install babel-preset-inferno-app.

```sh
npm install babel-preset-inferno-app --save-dev
```

Then create a file named `.babelrc` with following contents in the root folder of your project:

```json
{
  "presets": ["inferno-app"]
}
```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](https://babeljs.io/docs/plugins/transform-object-rest-spread/) and [babel-plugin-inferno](https://github.com/infernojs/babel-plugin-inferno), which assumes that `Object.assign` is available or polyfilled.

## Usage with Flow

Make sure you have a `.flowconfig` file at the root directory. You can also use the `flow` option on `.babelrc`:

```json
{
  "presets": [["inferno-app", { "flow": true, "typescript": false }]]
}
```

## Usage with TypeScript

Make sure you have a `tsconfig.json` file at the root directory. You can also use the `typescript` option on `.babelrc`:

```json
{
  "presets": [["inferno-app", { "flow": false, "typescript": true }]]
}
```

## Absolute Runtime Paths

Absolute paths are enabled by default for imports. To use relative paths instead, set the `absoluteRuntime` option in `.babelrc` to `false`:

```
{
  "presets": [["inferno-app", { "absoluteRuntime": false }]]
}
```
