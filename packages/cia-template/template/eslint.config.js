import js from '@eslint/js';
import inferno from 'eslint-plugin-inferno';
import infernoAppBase from 'eslint-config-inferno-app/base';

export default [
  ...infernoAppBase,
  js.configs.recommended,
  inferno.configs.flat.recommended,
  {
    rules: {
      // Don't report unused `catch (e)` bindings, as before ESLint 9
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
    },
  },
];
