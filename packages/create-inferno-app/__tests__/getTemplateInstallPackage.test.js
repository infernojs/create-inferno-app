/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { getTemplateInstallPackage } = require('../createInfernoApp');

describe('getTemplateInstallPackage', () => {
  it('no options gives cia-template', async () => {
    await expect(getTemplateInstallPackage()).resolves.toBe('cia-template');
  });

  it('cia-template gives cia-template', async () => {
    await expect(getTemplateInstallPackage('cia-template')).resolves.toBe(
      'cia-template'
    );
  });

  it('cia-template-typescript gives cia-template-typescript', async () => {
    await expect(
      getTemplateInstallPackage('cia-template-typescript')
    ).resolves.toBe('cia-template-typescript');
  });

  it('typescript gives cia-template-typescript', async () => {
    await expect(getTemplateInstallPackage('typescript')).resolves.toBe(
      'cia-template-typescript'
    );
  });

  it('typescript@next gives cia-template-typescript@next', async () => {
    await expect(getTemplateInstallPackage('typescript@next')).resolves.toBe(
      'cia-template-typescript@next'
    );
  });

  it('cia-template@next gives cia-template@next', async () => {
    await expect(getTemplateInstallPackage('cia-template@next')).resolves.toBe(
      'cia-template@next'
    );
  });

  it('cia-template-typescript@next gives cia-template-typescript@next', async () => {
    await expect(
      getTemplateInstallPackage('cia-template-typescript@next')
    ).resolves.toBe('cia-template-typescript@next');
  });

  it('@iansu gives @iansu/cia-template', async () => {
    await expect(getTemplateInstallPackage('@iansu')).resolves.toBe(
      '@iansu/cia-template'
    );
  });

  it('@iansu/cia-template gives @iansu/cia-template', async () => {
    await expect(
      getTemplateInstallPackage('@iansu/cia-template')
    ).resolves.toBe('@iansu/cia-template');
  });

  it('@iansu/cia-template@next gives @iansu/cia-template@next', async () => {
    await expect(
      getTemplateInstallPackage('@iansu/cia-template@next')
    ).resolves.toBe('@iansu/cia-template@next');
  });

  it('@iansu/cia-template-typescript@next gives @iansu/cia-template-typescript@next', async () => {
    await expect(
      getTemplateInstallPackage('@iansu/cia-template-typescript@next')
    ).resolves.toBe('@iansu/cia-template-typescript@next');
  });

  it('http://example.com/cia-template.tar.gz gives http://example.com/cia-template.tar.gz', async () => {
    await expect(
      getTemplateInstallPackage('http://example.com/cia-template.tar.gz')
    ).resolves.toBe('http://example.com/cia-template.tar.gz');
  });
});
