/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* @flow */
import { Component } from 'inferno';
import CodeBlock from './StackFrameCodeBlock';
import { getPrettyURL } from '../utils/getPrettyURL';

import type { StackFrame as StackFrameType } from '../utils/stack-frame';
import type { ErrorLocation } from '../utils/parseCompileError';
import type { Theme } from '../styles';

const linkStyle = (theme: Theme) => ({
  'font-size': '0.9em',
  'margin-bottom': '0.9em',
});

const anchorStyle = (theme: Theme) => ({
  'text-decoration': 'none',
  color: theme.anchorColor,
  cursor: 'pointer',
});

const codeAnchorStyle = (theme: Theme) => ({
  cursor: 'pointer',
});

const toggleStyle = (theme: Theme) => ({
  'margin-bottom': '1.5em',
  color: theme.toggleColor,
  cursor: 'pointer',
  border: 'none',
  display: 'block',
  width: '100%',
  'text-align': 'left',
  background: theme.toggleBackground,
  'font-family': 'Consolas, Menlo, monospace',
  'font-size': '1em',
  padding: '0px',
  'line-height': '1.5',
});

type StackFramePropsType = {|
  frame: StackFrameType,
  contextSize: number,
  critical: boolean,
  showCode: boolean,
  editorHandler: (errorLoc: ErrorLocation) => void,
|};

class StackFrame extends Component<StackFramePropsType, { compiled: boolean }> {
  constructor(props) {
    super(props);

    this.state = {
      compiled: false,
    };
  }

  toggleCompiled = () => {
    this.setState(prevState => ({ compiled: !prevState.compiled }));
  };

  getErrorLocation = () => {
    const { _originalFileName: fileName, _originalLineNumber: lineNumber } =
      this.props.frame;

    if (!fileName) {
      return null;
    }

    const isInternalWebpackBootstrapCode = fileName.trim().indexOf(' ') !== -1;
    if (isInternalWebpackBootstrapCode) {
      return null;
    }

    return { fileName, lineNumber: lineNumber || 1 };
  };

  editorHandler = () => {
    const errorLoc = this.getErrorLocation();
    if (!errorLoc) {
      return;
    }
    this.props.editorHandler(errorLoc);
  };

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.editorHandler();
    }
  };

  render() {
    const { frame, contextSize, critical, showCode, editorHandler } =
      this.props;
    const { compiled } = this.state;
    const theme = this.context.theme;

    const {
      fileName,
      lineNumber,
      columnNumber,
      _scriptCode: scriptLines,
      _originalFileName: sourceFileName,
      _originalLineNumber: sourceLineNumber,
      _originalColumnNumber: sourceColumnNumber,
      _originalScriptCode: sourceLines,
    } = frame;
    const functionName = frame.getFunctionName();

    const url = getPrettyURL(
      sourceFileName,
      sourceLineNumber,
      sourceColumnNumber,
      fileName,
      lineNumber,
      columnNumber,
      compiled
    );

    let codeBlockProps = null;
    if (showCode) {
      if (
        compiled &&
        scriptLines &&
        scriptLines.length !== 0 &&
        lineNumber != null
      ) {
        codeBlockProps = {
          lines: scriptLines,
          lineNum: lineNumber,
          columnNum: columnNumber,
          contextSize,
          main: critical,
        };
      } else if (
        !compiled &&
        sourceLines &&
        sourceLines.length !== 0 &&
        sourceLineNumber != null
      ) {
        codeBlockProps = {
          lines: sourceLines,
          lineNum: sourceLineNumber,
          columnNum: sourceColumnNumber,
          contextSize,
          main: critical,
        };
      }
    }

    const canOpenInEditor =
      this.getErrorLocation() !== null && editorHandler !== null;

    return (
      <div>
        <div>{functionName}</div>
        <div style={linkStyle(theme)}>
          <span
            style={canOpenInEditor ? anchorStyle(theme) : null}
            onClick={canOpenInEditor ? this.editorHandler : null}
            onKeyDown={canOpenInEditor ? this.onKeyDown : null}
            tabIndex={canOpenInEditor ? '0' : null}
          >
            {url}
          </span>
        </div>
        {codeBlockProps && (
          <span>
            <span
              onClick={canOpenInEditor ? this.editorHandler : null}
              style={canOpenInEditor ? codeAnchorStyle(theme) : null}
            >
              <CodeBlock {...codeBlockProps} />
            </span>
            <button style={toggleStyle(theme)} onClick={this.toggleCompiled}>
              {'View ' + (compiled ? 'source' : 'compiled')}
            </button>
          </span>
        )}
      </div>
    );
  }
}

export default StackFrame;
