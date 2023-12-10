import testSetup from '../__shared__/test-setup';
import fs from 'fs-extra';
import globby from 'globby';
import path from 'path';

test('contains a relative path in production build', async () => {
  await testSetup.scripts.build();

  const buildDir = path.join(testSetup.testDirectory, 'build');
  const cssFile = path.join(
    buildDir,
    globby.sync('**/*.css', { cwd: buildDir }).pop(),
  );
  const svgFile = path.join(
    buildDir,
    globby.sync('**/*.svg', { cwd: buildDir }).pop(),
  );
  const desiredPath = /url\((.+?)\)/
    .exec(fs.readFileSync(cssFile, 'utf8'))
    .pop();
  expect(path.resolve(path.join(path.dirname(cssFile), desiredPath))).toBe(
    path.resolve(svgFile),
  );
});
