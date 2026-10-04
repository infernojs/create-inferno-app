import js from '@eslint/js';
import { fixupPluginRules } from '@eslint/compat';
import { flatConfigs as importConfigs } from 'eslint-plugin-import-x';
import ftFlowPlugin from 'eslint-plugin-ft-flow';
import infernoPlugin from 'eslint-plugin-inferno';
import hermesParser from 'hermes-eslint';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/node_modules/',
      '**/build/',
      'test/fixtures/webpack-message-formatting/src/AppBabel.js',
      'packages/inferno-error-overlay/lib/',
      'packages/inferno-error-overlay/fixtures/',
      'test/fixtures/',
      // Linted with its own eslint.config.js in generated apps
      'packages/cia-template-typescript/template/',
    ],
  },
  js.configs.recommended,
  importConfigs.recommended,
  {
    plugins: {
      // eslint-plugin-ft-flow still uses context methods removed in ESLint 10
      'ft-flow': fixupPluginRules(ftFlowPlugin),
    },
    languageOptions: {
      parser: hermesParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
        ...globals.jest,
      },
    },
    settings: ftFlowPlugin.configs.recommended.settings,
    rules: {
      ...ftFlowPlugin.configs.recommended.rules,
      'no-console': 'off',
      // ESLint 9 started reporting unused caught errors by default
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
      strict: ['error', 'global'],
      curly: 'warn',
      'ft-flow/no-types-missing-file-annotation': 'off',
    },
  },
  {
    files: ['packages/babel-preset-inferno-app/**/*.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        // Node.js code, `crypto` is required from the built-in module
        crypto: 'off',
      },
    },
  },
  {
    files: ['packages/inferno-scripts/config/paths.js'],
    rules: {
      // The first `configPaths` assignment is the one used after ejecting
      'no-useless-assignment': 'off',
    },
  },
  {
    ...infernoPlugin.configs.flat.recommended,
    files: [
      'docusaurus/website/src/**/*.js',
      'packages/cia-template/**/*.js',
      'packages/inferno-error-overlay/**/*.js',
      'packages/inferno-scripts/fixtures/kitchensink/template/{src,integration}/**/*.js',
      'test/fixtures/*/src/*.js',
    ],
    ignores: ['packages/inferno-error-overlay/*.js'],
    rules: {
      // Re-enables the rules, like no-undef, that ft-flow turns off
      ...js.configs.recommended.rules,
      ...infernoPlugin.configs.flat.recommended.rules,
      // Same as eslint-config-inferno-app uses for application code
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
    },
  },
  {
    files: ['packages/inferno-error-overlay/src/**/*.js'],
    languageOptions: {
      globals: {
        // Flow utility type
        $Shape: 'readonly',
      },
    },
    rules: {
      // Webpack alias for the prebuilt iframe bundle
      'import-x/no-unresolved': ['error', { ignore: ['^iframeScript$'] }],
    },
  },
  {
    files: ['packages/inferno-scripts/fixtures/kitchensink/template/**/*.js'],
    rules: {
      // The fixture's own dependencies, linked modules and `baseUrl` imports
      // only exist in the app generated from it
      'import-x/no-unresolved': 'off',
    },
  },
  {
    files: [
      'test/fixtures/webpack-message-formatting/src/{AppLintError,AppLintWarning,AppUnknownFile}.js',
    ],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['test/fixtures/webpack-message-formatting/src/Export5.js'],
    rules: {
      'import-x/no-anonymous-default-export': 'off',
    },
  },
  {
    files: ['test/fixtures/issue-5176-flow-class-properties/src/App.js'],
    rules: {
      'no-dupe-class-members': 'off',
    },
  },
];
