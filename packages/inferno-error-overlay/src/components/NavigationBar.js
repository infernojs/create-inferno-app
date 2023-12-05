/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* @flow */
import type { Theme } from '../styles';

const navigationBarStyle = {
  'margin-bottom': '0.5rem',
};

const buttonContainerStyle = {
  'margin-right': '1em',
};

const _navButtonStyle = {
  border: 'none',
  'border-radius': '4px',
  padding: '3px 6px',
  cursor: 'pointer',
};

const leftButtonStyle = (theme: Theme) => ({
  ..._navButtonStyle,
  'background-color': theme.navBackground,
  color: theme.navArrow,
  'border-top-right-radius': '0px',
  'border-bottom-right-radius': '0px',
  'margin-right': '1px',
});

const rightButtonStyle = (theme: Theme) => ({
  ..._navButtonStyle,
  'background-color': theme.navBackground,
  color: theme.navArrow,
  'border-top-left-radius': '0px',
  'border-bottom-left-radius': '0px',
});

type Callback = () => void;

type NavigationBarPropsType = {|
  currentError: number,
  totalErrors: number,
  previous: Callback,
  next: Callback,
|};

function NavigationBar(props: NavigationBarPropsType, { theme }) {
  const { currentError, totalErrors, previous, next } = props;
  return (
    <div style={navigationBarStyle}>
      <span style={buttonContainerStyle}>
        <button onClick={previous} style={leftButtonStyle(theme)}>
          ←
        </button>
        <button onClick={next} style={rightButtonStyle(theme)}>
          →
        </button>
      </span>
      {`${currentError} of ${totalErrors} errors on the page`}
    </div>
  );
}

export default NavigationBar;
