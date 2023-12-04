/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const _preStyle = {
  position: 'relative',
  display: 'block',
  padding: '0.5em',
  'margin-top': '0.5em',
  'margin-bottom': '0.5em',
  'overflow-x': 'auto',
  'white-space': 'pre-wrap',
  'border-radius': '0.25rem',
};

const codeStyle = {
  'font-family': 'Consolas, Menlo, monospace',
};

type CodeBlockPropsType = {|
  main: boolean,
  codeHTML: string,
|};

function CodeBlock({ main, codeHTML }: CodeBlockPropsType, { theme }) {
  const primaryPreStyle = {
    ..._preStyle,
    'background-color': theme.primaryPreBackground,
    color: theme.primaryPreColor,
  };
  const secondaryPreStyle = {
    ..._preStyle,
    'background-color': theme.secondaryPreBackground,
    color: theme.secondaryPreColor,
  };
  const preStyle = main ? primaryPreStyle : secondaryPreStyle;
  const codeBlock = { __html: codeHTML };

  return (
    <pre style={preStyle}>
      <code style={codeStyle} dangerouslySetInnerHTML={codeBlock} />
    </pre>
  );
}

export default CodeBlock;
