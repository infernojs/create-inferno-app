/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { getTemplateInstallPackage } = require('../createInfernoApp');

describe('getTemplateInstallPackage', () => {
  it('no options gives cra-inferno-template', async () => {
    await expect(getTemplateInstallPackage()).resolves.toBe('cra-inferno-template');
  });

  it('cra-inferno-template gives cra-inferno-template', async () => {
    await expect(getTemplateInstallPackage('cra-inferno-template')).resolves.toBe(
      'cra-inferno-template'
    );
  });

  it('cra-inferno-template-typescript gives cra-inferno-template-typescript', async () => {
    await expect(
      getTemplateInstallPackage('cra-inferno-template-typescript')
    ).resolves.toBe('cra-inferno-template-typescript');
  });

  it('typescript gives cra-inferno-template-typescript', async () => {
    await expect(getTemplateInstallPackage('typescript')).resolves.toBe(
      'cra-inferno-template-typescript'
    );
  });

  it('typescript@next gives cra-inferno-template-typescript@next', async () => {
    await expect(getTemplateInstallPackage('typescript@next')).resolves.toBe(
      'cra-inferno-template-typescript@next'
    );
  });

  it('cra-inferno-template@next gives cra-inferno-template@next', async () => {
    await expect(getTemplateInstallPackage('cra-inferno-template@next')).resolves.toBe(
      'cra-inferno-template@next'
    );
  });

  it('cra-inferno-template-typescript@next gives cra-inferno-template-typescript@next', async () => {
    await expect(
      getTemplateInstallPackage('cra-inferno-template-typescript@next')
    ).resolves.toBe('cra-inferno-template-typescript@next');
  });

  it('@iansu gives @iansu/cra-inferno-template', async () => {
    await expect(getTemplateInstallPackage('@iansu')).resolves.toBe(
      '@iansu/cra-inferno-template'
    );
  });

  it('@iansu/cra-inferno-template gives @iansu/cra-inferno-template', async () => {
    await expect(
      getTemplateInstallPackage('@iansu/cra-inferno-template')
    ).resolves.toBe('@iansu/cra-inferno-template');
  });

  it('@iansu/cra-inferno-template@next gives @iansu/cra-inferno-template@next', async () => {
    await expect(
      getTemplateInstallPackage('@iansu/cra-inferno-template@next')
    ).resolves.toBe('@iansu/cra-inferno-template@next');
  });

  it('@iansu/cra-inferno-template-typescript@next gives @iansu/cra-inferno-template-typescript@next', async () => {
    await expect(
      getTemplateInstallPackage('@iansu/cra-inferno-template-typescript@next')
    ).resolves.toBe('@iansu/cra-inferno-template-typescript@next');
  });

  it('http://example.com/cra-inferno-template.tar.gz gives http://example.com/cra-inferno-template.tar.gz', async () => {
    await expect(
      getTemplateInstallPackage('http://example.com/cra-inferno-template.tar.gz')
    ).resolves.toBe('http://example.com/cra-inferno-template.tar.gz');
  });
});
