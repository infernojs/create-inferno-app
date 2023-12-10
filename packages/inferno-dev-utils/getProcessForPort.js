/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk';
import { execFileSync, execSync } from 'child_process';
import path from 'path';
import { readJsonFile } from './readJsonFile.js';

var execOptions = {
  encoding: 'utf8',
  stdio: [
    'pipe', // stdin (default)
    'pipe', // stdout (default)
    'ignore', //stderr
  ],
};

function isProcessAInfernoApp(processCommand) {
  return /^node .*inferno-scripts\/scripts\/start\.js\s?$/.test(processCommand);
}

function getProcessIdOnPort(port) {
  return execFileSync(
    'lsof',
    ['-i:' + port, '-P', '-t', '-sTCP:LISTEN'],
    execOptions,
  )
    .split('\n')[0]
    .trim();
}

function getPackageNameInDirectory(directory) {
  var packagePath = path.join(directory.trim(), 'package.json');

  try {
    return readJsonFile(packagePath).name;
  } catch (e) {
    return null;
  }
}

function getProcessCommand(processId, processDirectory) {
  var command = execSync(
    'ps -o command -p ' + processId + ' | sed -n 2p',
    execOptions,
  );

  command = command.replace(/\n$/, '');

  if (isProcessAInfernoApp(command)) {
    const packageName = getPackageNameInDirectory(processDirectory);
    return packageName ? packageName : command;
  } else {
    return command;
  }
}

function getDirectoryOfProcessById(processId) {
  return execSync(
    'lsof -p ' +
      processId +
      ' | awk \'$4=="cwd" {for (i=9; i<=NF; i++) printf "%s ", $i}\'',
    execOptions,
  ).trim();
}

function getProcessForPort(port) {
  try {
    var processId = getProcessIdOnPort(port);
    var directory = getDirectoryOfProcessById(processId);
    var command = getProcessCommand(processId, directory);
    return (
      chalk.cyan(command) +
      chalk.grey(' (pid ' + processId + ')\n') +
      chalk.blue('  in ') +
      chalk.cyan(directory)
    );
  } catch (e) {
    return null;
  }
}

export default getProcessForPort;
