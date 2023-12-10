// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end

import { dismissRuntimeErrors, reportRuntimeError } from "inferno-error-overlay";


export default {
  clearRuntimeErrors: dismissRuntimeErrors,
  handleRuntimeError: reportRuntimeError,
};
