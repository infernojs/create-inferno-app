/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* @flow */
import { Component } from 'inferno';
import StackFrame from './StackFrame.js';
import Collapsible from '../components/Collapsible.js';
import { isInternalFile } from '../utils/isInternalFile.js';
import { isBultinErrorName } from '../utils/isBultinErrorName.js';

import type { StackFrame as StackFrameType } from '../utils/stack-frame.js';
import type { ErrorLocation } from '../utils/parseCompileError.js';

const traceStyle = {
  'font-size': '1em',
  flex: '0 1 auto',
  'min-height': '0px',
  overflow: 'auto',
};

type Props = {|
  stackFrames: StackFrameType[],
  errorName: string,
  contextSize: number,
  editorHandler: (errorLoc: ErrorLocation) => void,
|};

class StackTrace extends Component<Props> {
  renderFrames() {
    const { stackFrames, errorName, contextSize, editorHandler } = this.props;
    const renderedFrames = [];
    let hasReachedAppCode = false,
      currentBundle = [],
      bundleCount = 0;

    for (let index = 0; index < stackFrames.length; index++) {
      const frame = stackFrames[index];
      const { fileName, _originalFileName: sourceFileName } = frame;
      const isInternalUrl = isInternalFile(sourceFileName, fileName);
      const isThrownIntentionally = !isBultinErrorName(errorName);
      const shouldCollapse =
        isInternalUrl && (isThrownIntentionally || hasReachedAppCode);

      if (!isInternalUrl) {
        hasReachedAppCode = true;
      }

      const frameEle = (
        <StackFrame
          key={'frame-' + index}
          frame={frame}
          contextSize={contextSize}
          critical={index === 0}
          showCode={!shouldCollapse}
          editorHandler={editorHandler}
        />
      );
      const lastElement = index === stackFrames.length - 1;

      if (shouldCollapse) {
        currentBundle.push(frameEle);
      }

      if (!shouldCollapse || lastElement) {
        if (currentBundle.length === 1) {
          renderedFrames.push(currentBundle[0]);
        } else if (currentBundle.length > 1) {
          bundleCount++;
          renderedFrames.push(
            <Collapsible key={'bundle-' + bundleCount}>
              {currentBundle}
            </Collapsible>,
          );
        }
        currentBundle = [];
      }

      if (!shouldCollapse) {
        renderedFrames.push(frameEle);
      }
    }

    return renderedFrames;
  }

  render() {
    return <div style={traceStyle}>{this.renderFrames()}</div>;
  }
}

export default StackTrace;
