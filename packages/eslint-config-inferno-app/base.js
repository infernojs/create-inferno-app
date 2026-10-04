/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createRequire } from 'module';
import babelParser from '@babel/eslint-parser';
import infernoPlugin from 'eslint-plugin-inferno';
import globals from 'globals';

const require = createRequire(import.meta.url);

// This file contains the minimum ESLint configuration required for Create
// Inferno App support, and is used as the `baseConfig` for `eslint-webpack-plugin`
// to ensure that user-provided configs don't need this boilerplate.

export const files = ['**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}'];

export default [
  {
    files,

    plugins: {
      inferno: infernoPlugin,
    },

    linterOptions: {
      // Not reported before ESLint 9
      reportUnusedDisableDirectives: 'off',
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [require.resolve('babel-preset-inferno-app/prod')],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
        ...globals.jest,
      },
    },
  },
];
