/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/iframeScript.js',
  output: {
    path: join(__dirname, './lib'),
    filename: 'iframe-bundle.js',
  },
  module: {
    rules: [
      {
        oneOf: [
          // Source
          {
            test: /\.js$/,
            include: [resolve(__dirname, './src')],
            use: {
              loader: 'babel-loader',
            },
          },
          // Dependencies
          {
            test: /\.js$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  ['babel-preset-inferno-app/dependencies', { helpers: true }],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    // `process.env.NODE_ENV` is defined below
    nodeEnv: false,
    minimizer: [
      // This code is embedded as a string, so it would never be optimized
      // elsewhere.
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            comparisons: false,
          },
          output: {
            comments: false,
            ascii_only: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      // We set process.env.NODE_ENV to 'production' so that Inferno is built
      // in production mode.
      'process.env': { NODE_ENV: '"production"' },
    }),
  ],
  performance: false,
};
