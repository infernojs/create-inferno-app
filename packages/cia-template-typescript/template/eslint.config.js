import js from '@eslint/js';
import love from 'eslint-config-love';
import infernoApp from 'eslint-config-inferno-app';

export default [
  { ...love, files: ['**/*.{ts,tsx}'] },
  js.configs.recommended,
  ...infernoApp,
];
