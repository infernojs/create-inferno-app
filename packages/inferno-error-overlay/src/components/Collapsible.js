/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component } from 'inferno';
import type { Element as InfernoElement } from 'inferno';
import type { Theme } from '../styles.js';

const _collapsibleStyle = {
  cursor: 'pointer',
  border: 'none',
  display: 'block',
  width: '100%',
  'text-align': 'left',
  'font-family': 'Consolas, Menlo, monospace',
  'font-size': '1em',
  padding: '0px',
  'line-height': '1.5',
};

const collapsibleCollapsedStyle = (theme: Theme) => ({
  ..._collapsibleStyle,
  color: theme.color,
  background: theme.background,
  'margin-bottom': '1.5em',
});

const collapsibleExpandedStyle = (theme: Theme) => ({
  ..._collapsibleStyle,
  color: theme.color,
  background: theme.background,
  'margin-bottom': '0.6em',
});

type CollapsiblePropsType = {|
  children: InfernoElement<any>[],
|};

class Collapsible extends Component<
  CollapsiblePropsType,
  { collapsed: boolean },
> {
  constructor(props: CollapsiblePropsType) {
    super(props);

    this.state = {
      collapsed: true,
    };
  }

  toggleCollapsed = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  };

  render() {
    const { collapsed } = this.state;
    const theme = this.context.theme;
    const count = this.props.children.length;

    return (
      <div>
        <button
          onClick={this.toggleCollapsed}
          style={
            collapsed
              ? collapsibleCollapsedStyle(theme)
              : collapsibleExpandedStyle(theme)
          }
        >
          {(collapsed ? '▶' : '▼') +
            ` ${count} stack frames were ` +
            (collapsed ? 'collapsed.' : 'expanded.')}
        </button>
        <div style={{ display: collapsed ? 'none' : 'block' }}>
          {this.props.children}
          <button
            onClick={this.toggleCollapsed}
            style={collapsibleExpandedStyle(theme)}
          >
            {`▲ ${count} stack frames were expanded.`}
          </button>
        </div>
      </div>
    );
  }
}

export default Collapsible;
