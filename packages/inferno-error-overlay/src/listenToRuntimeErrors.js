/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  register as registerError,
  unregister as unregisterError,
} from './effects/unhandledError.js';
import {
  register as registerPromise,
  unregister as unregisterPromise,
} from './effects/unhandledRejection.js';
import {
  register as registerStackTraceLimit,
  unregister as unregisterStackTraceLimit,
} from './effects/stackTraceLimit.js';
import {
  permanentRegister as permanentRegisterConsole,
  registerInfernoStack,
  unregisterInfernoStack,
} from './effects/proxyConsole.js';
import { massage as massageWarning } from './utils/warnings.js';
import { getStackFrames } from './utils/getStackFrames.js';

import type { StackFrame } from './utils/stack-frame.js';

const CONTEXT_SIZE: number = 3;

export type ErrorRecord = {|
  error: Error,
  unhandledRejection: boolean,
  contextSize: number,
  stackFrames: StackFrame[],
|};

export const crashWithFrames =
  (crash: ErrorRecord => void) =>
  (error: Error, unhandledRejection = false) => {
    getStackFrames(error, unhandledRejection, CONTEXT_SIZE)
      .then(stackFrames => {
        if (stackFrames == null) {
          return;
        }
        crash({
          error,
          unhandledRejection,
          contextSize: CONTEXT_SIZE,
          stackFrames,
        });
      })
      .catch(e => {
        console.log('Could not get the stack frames of error:', e);
      });
  };

export function listenToRuntimeErrors(
  crash: ErrorRecord => void,
  filename: string = '/static/js/bundle.js',
) {
  const crashWithFramesRunTime = crashWithFrames(crash);

  registerError(window, error => crashWithFramesRunTime(error, false));
  registerPromise(window, error => crashWithFramesRunTime(error, true));
  registerStackTraceLimit();
  registerInfernoStack();
  permanentRegisterConsole('error', (warning, stack) => {
    const data = massageWarning(warning, stack);
    crashWithFramesRunTime(
      // $FlowFixMe
      {
        message: data.message,
        stack: data.stack,
        __unmap_source: filename,
      },
      false,
    );
  });

  return function stopListening() {
    unregisterStackTraceLimit();
    unregisterPromise(window);
    unregisterError(window);
    unregisterInfernoStack();
  };
}
