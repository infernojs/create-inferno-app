/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* @flow */
import ErrorOverlay from '../components/ErrorOverlay.js';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import CodeBlock from '../components/CodeBlock.js';
import generateAnsiHTML from '../utils/generateAnsiHTML.js';
import parseCompileError from '../utils/parseCompileError.js';
import type { ErrorLocation } from '../utils/parseCompileError.js';

const codeAnchorStyle = {
  cursor: 'pointer',
};

type CompileErrorContainerPropsType = {|
  error: string,
  editorHandler: (errorLoc: ErrorLocation) => void,
|};

function CompileErrorContainer(
  props: CompileErrorContainerPropsType,
  { theme },
) {
  const { error, editorHandler } = props;
  const errLoc: ?ErrorLocation = parseCompileError(error);
  const canOpenInEditor = errLoc !== null && editorHandler !== null;
  return (
    <ErrorOverlay>
      <Header headerText="Failed to compile" />
      <div
        onClick={canOpenInEditor && errLoc ? () => editorHandler(errLoc) : null}
        style={canOpenInEditor ? codeAnchorStyle : null}
      >
        <CodeBlock main={true} codeHTML={generateAnsiHTML(error, theme)} />
      </div>
      <Footer line1="This error occurred during the build time and cannot be dismissed." />
    </ErrorOverlay>
  );
}

export default CompileErrorContainer;
