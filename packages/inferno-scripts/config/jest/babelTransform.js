// @remove-on-eject-begin
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end

import babelJest from "babel-jest";
import { fileURLToPath } from "url";

export default babelJest.createTransformer({
  presets: [[fileURLToPath(import.meta.resolve("babel-preset-inferno-app"))]],
  babelrc: false,
  configFile: false
});
