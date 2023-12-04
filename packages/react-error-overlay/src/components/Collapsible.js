/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Element as InfernoElement } from 'inferno';
import type { Theme } from '../styles';

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

class Collapsible {
  constructor(props: CollapsiblePropsType, context: any) {
    this.state = {
      collapsed: true,
    };

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed(val) {
    this.setState({
      collapsed: val,
    });
  }

  render(props: CollapsiblePropsType, { theme }) {
    const { collapsed } = this.state;
    const count = props.children.length;

    return (
        <div>
          <button
              onClick={toggleCollapsed}
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
            {props.children}
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
