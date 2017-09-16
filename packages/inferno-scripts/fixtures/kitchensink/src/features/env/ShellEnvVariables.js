/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import Inferno from 'inferno';

export default () => (
  <span id="feature-shell-env-variables">
    {process.env.REACT_APP_SHELL_ENV_MESSAGE}.
  </span>
);
