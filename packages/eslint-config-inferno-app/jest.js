/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import jestPlugin from 'eslint-plugin-jest';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import globals from 'globals';

// We use eslint-webpack-plugin so even warnings are very visible.
// This is why we prefer to use "WARNING" level for potential errors,
// and we try not to use "ERROR" level at all.

export default [
  {
    files: [
      '**/__tests__/**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts}',
      '**/*.{spec,test}.{js,mjs,cjs,jsx,ts,tsx,mts,cts}',
    ],
    plugins: {
      jest: jestPlugin,
      'testing-library': testingLibraryPlugin,
    },
    languageOptions: {
      globals: globals.jest,
    },
    // A subset of the recommended rules:
    rules: {
      // https://github.com/jest-community/eslint-plugin-jest
      'jest/no-conditional-expect': 'error',
      'jest/no-identical-title': 'error',
      'jest/no-interpolation-in-snapshots': 'error',
      'jest/no-jasmine-globals': 'error',
      'jest/no-mocks-import': 'error',
      'jest/valid-describe-callback': 'error',
      'jest/valid-expect': 'error',
      'jest/valid-expect-in-promise': 'error',
      'jest/valid-title': 'warn',
    },
  },
];
