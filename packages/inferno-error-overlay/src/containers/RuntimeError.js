/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* @flow */
import Header from '../components/Header.js';
import StackTrace from './StackTrace.js';

import type { StackFrame } from '../utils/stack-frame.js';
import type { ErrorLocation } from '../utils/parseCompileError.js';

const wrapperStyle = {
  display: 'flex',
  'flex-direction': 'column',
};

export type ErrorRecord = {|
  error: Error,
  unhandledRejection: boolean,
  contextSize: number,
  stackFrames: StackFrame[],
|};

type Props = {|
  errorRecord: ErrorRecord,
  editorHandler: (errorLoc: ErrorLocation) => void,
|};

function RuntimeError({ errorRecord, editorHandler }: Props) {
  const { error, unhandledRejection, contextSize, stackFrames } = errorRecord;
  const errorName = unhandledRejection
    ? 'Unhandled Rejection (' + error.name + ')'
    : error.name;

  // Make header prettier
  const message = error.message;
  let headerText =
    message.match(/^\w*:/) || !errorName ? message : errorName + ': ' + message;

  headerText = headerText
    // TODO: maybe remove this prefix from fbjs?
    // It's just scaring people
    .replace(/^Invariant Violation:\s*/, '')
    // This is not helpful either:
    .replace(/^Warning:\s*/, '');

  return (
    <div style={wrapperStyle}>
      <Header headerText={headerText} />
      <StackTrace
        stackFrames={stackFrames}
        errorName={errorName}
        contextSize={contextSize}
        editorHandler={editorHandler}
      />
    </div>
  );
}

export default RuntimeError;
