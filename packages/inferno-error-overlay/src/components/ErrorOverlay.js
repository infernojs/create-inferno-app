/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* @flow */
import { Component, createRef } from 'inferno';
import type { InfernoNode } from 'inferno';
import type { Theme } from '../styles';

const overlayStyle = (theme: Theme) => ({
  position: 'relative',
  display: 'inline-flex',
  'flex-direction': 'column',
  height: '100%',
  width: '1024px',
  'max-width': '100%',
  'overflow-x': 'hidden',
  'overflow-y': 'auto',
  padding: '0.5rem',
  'box-sizing': 'border-box',
  'text-align': 'left',
  'font-family': 'Consolas, Menlo, monospace',
  'font-size': '11px',
  'white-space': 'pre-wrap',
  'word-break': 'break-word',
  'line-height': 1.5,
  color: theme.color,
});

type ErrorOverlayPropsType = {|
  children: InfernoNode,
  shortcutHandler?: (eventKey: string) => void,
|};

class ErrorOverlay extends Component<ErrorOverlayPropsType> {
  constructor(props) {
    super(props);
    this.iframeWindowRef = createRef();

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  get iframeWindow() {
    return this.iframeWindowRef.ref.current;
  }

  onKeyDown(ev) {
    if (this.props.shortcutHandler) {
      this.props.shortcutHandler(ev.key);
    }
  }

  componentDidUpdate() {
    this.updateEventListener(this.props.shortcutHandler);
  }

  componentWillUnmount() {
    this.updateEventListener(null);
  }

  updateEventListener(eventListener) {
    if (eventListener) {
      window.addEventListener('keydown', this.onKeyDown);
      if (this.iframeWindow) {
        this.iframeWindow.addEventListener('keydown', this.onKeyDown);
      }
    } else {
      window.removeEventListener('keydown', this.onKeyDown);
      if (this.iframeWindow) {
        this.iframeWindow.removeEventListener('keydown', this.onKeyDown);
      }
    }
  }

  render() {
    return (
      <div style={overlayStyle(this.context.theme)} ref={this.iframeWindowRef}>
        {this.props.children}
      </div>
    );
  }
}

export default ErrorOverlay;
