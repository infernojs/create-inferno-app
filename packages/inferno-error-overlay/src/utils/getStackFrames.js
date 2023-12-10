/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* @flow */
import type { StackFrame } from './stack-frame.js';
import { parse } from './parser.js';
import { map } from './mapper.js';
import { unmap } from './unmapper.js';

function getStackFrames(
  error: Error,
  unhandledRejection: boolean = false,
  contextSize: number = 3,
): Promise<StackFrame[] | null> {
  const parsedFrames = parse(error);
  let enhancedFramesPromise;
  // $FlowFixMe
  if (error.__unmap_source) {
    enhancedFramesPromise = unmap(
      // $FlowFixMe
      error.__unmap_source,
      parsedFrames,
      contextSize,
    );
  } else {
    enhancedFramesPromise = map(parsedFrames, contextSize);
  }
  return enhancedFramesPromise.then(enhancedFrames => {
    if (
      enhancedFrames
        .map(f => f._originalFileName)
        .filter(f => f != null && f.indexOf('node_modules') === -1).length === 0
    ) {
      return null;
    }
    return enhancedFrames.filter(
      ({ functionName }) =>
        functionName == null ||
        functionName.indexOf('__stack_frame_overlay_proxy_console__') === -1,
    );
  });
}

export default getStackFrames;
export { getStackFrames };
