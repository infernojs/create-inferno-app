# eslint-config-inferno-app

This package includes the shareable ESLint configuration used by [Create Inferno App](https://github.com/infernojs/create-inferno-app).

## Usage in Create Inferno App Projects

The easiest way to use this configuration is with [Create Inferno App](https://github.com/infernojs/create-inferno-app), which includes it by default.

**You don’t need to install it separately in Create Inferno App projects.**

## Usage Outside of Create Inferno App

If you want to use this ESLint configuration in a project not built with Create Inferno App, you can install it with the following steps.

First, install this package and ESLint.

```sh
npm install --save-dev eslint-config-inferno-app eslint@^10.0.0
```

Then create a file named `eslint.config.js` with following contents in the root folder of your project:

```js
import infernoApp from 'eslint-config-inferno-app';

export default [...infernoApp];
```

That's it! You can override the settings from `eslint-config-inferno-app` by adding more configuration objects to the array in `eslint.config.js`. Learn more about [configuring ESLint](https://eslint.org/docs/latest/use/configure/) on the ESLint website.

If you only want the parser setup that Create Inferno App needs, without any rules, use `eslint-config-inferno-app/base` instead.

## Jest rules

This config also ships with optional Jest rules for ESLint (based on [`eslint-plugin-jest`](https://github.com/jest-community/eslint-plugin-jest)).

You can enable these rules by adding the Jest config to your ESLint config:

```js
import infernoApp from 'eslint-config-inferno-app';
import infernoAppJest from 'eslint-config-inferno-app/jest';

export default [...infernoApp, ...infernoAppJest];
```

## Accessibility Checks

The following rules from the [eslint-plugin-jsx-a11y-x](https://github.com/es-tooling/eslint-plugin-jsx-a11y-x) plugin (a maintained fork of [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y), registered under the `jsx-a11y` name) are activated. The same is done for [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x), registered as `import`. Their settings use the new names, for example `import-x/resolver` and `jsx-a11y-x`.

- [alt-text](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)
- [anchor-has-content](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-has-content.md)
- [aria-activedescendant-has-tabindex](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-activedescendant-has-tabindex.md)
- [aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md)
- [aria-proptypes](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md)
- [aria-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)
- [aria-unsupported-elements](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-unsupported-elements.md)
- [heading-has-content](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/heading-has-content.md)
- [href-no-hash](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/v5.1.1/docs/rules/href-no-hash.md)
- [iframe-has-title](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/iframe-has-title.md)
- [img-redundant-alt](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)
- [no-access-key](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)
- [no-distracting-elements](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md)
- [no-redundant-roles](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md)
- [role-has-required-aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md)
- [role-supports-aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md)
- [scope](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md)

If you want to enable even more accessibility rules, you can add the recommended rules of the plugin to the `eslint.config.js` file in the root of your project:

```js
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import infernoApp from 'eslint-config-inferno-app';

// The plugin is registered as `jsx-a11y` by eslint-config-inferno-app
const recommended = Object.entries(jsxA11y.configs.recommended.rules).map(
  ([rule, setting]) => [rule.replace('jsx-a11y-x/', 'jsx-a11y/'), setting],
);

export default [...infernoApp, { rules: Object.fromEntries(recommended) }];
```

However, if you are using [Create Inferno App](https://github.com/infernojs/create-inferno-app) and have not ejected, any additional rules will only be displayed in the [IDE integrations](https://facebook.github.io/create-react-app/docs/setting-up-your-editor#displaying-lint-output-in-the-editor), but not in the browser or the terminal.
