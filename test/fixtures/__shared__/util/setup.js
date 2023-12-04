'use strict';

const execa = require('execa');
const fs = require('fs-extra');
const path = require('path');
const tempy = require('tempy');
const InfernoScripts = require('./scripts');

module.exports = class TestSetup {
  constructor(fixtureName, templateDirectory) {
    this.fixtureName = fixtureName;

    this.templateDirectory = templateDirectory;
    this.testDirectory = null;
    this._scripts = null;

    this.setup = this.setup.bind(this);
    this.teardown = this.teardown.bind(this);

    this.isLocal = !(process.env.CI && process.env.CI !== 'false');
  }

  async setup() {
    await this.teardown();
    this.testDirectory = tempy.directory();
    await fs.copy(
      path.resolve(__dirname, '..', 'template'),
      this.testDirectory
    );
    await fs.copy(this.templateDirectory, this.testDirectory);
    await fs.remove(path.resolve(this.testDirectory, 'test.partial.js'));

    const packageJson = await fs.readJson(
      path.resolve(this.testDirectory, 'package.json')
    );

    const shouldInstallScripts = !this.isLocal;
    if (shouldInstallScripts) {
      packageJson.dependencies = Object.assign({}, packageJson.dependencies, {
        'inferno-scripts': 'latest',
      });
    }
    packageJson.scripts = Object.assign({}, packageJson.scripts, {
      start: 'inferno-scripts start',
      build: 'inferno-scripts build',
      test: 'inferno-scripts test',
    });
    packageJson.license = packageJson.license || 'UNLICENSED';
    await fs.writeJson(
      path.resolve(this.testDirectory, 'package.json'),
      packageJson
    );

    await execa('npm', ['install'], {
      cwd: this.testDirectory,
    });

    if (!shouldInstallScripts) {
      await fs.ensureSymlink(
        path.resolve(
          path.resolve(
            __dirname,
            '../../../..',
            'packages',
            'inferno-scripts',
            'bin',
            'inferno-scripts.js'
          )
        ),
        path.join(this.testDirectory, 'node_modules', '.bin', 'inferno-scripts')
      );
      await execa('npm', ['link', 'inferno-scripts'], {
        cwd: this.testDirectory,
      });
    }
  }

  get scripts() {
    if (this.testDirectory == null) {
      return null;
    }
    if (this._scripts == null) {
      this._scripts = new InfernoScripts(this.testDirectory);
    }
    return this._scripts;
  }

  async teardown() {
    if (this.testDirectory != null) {
      try {
        await fs.remove(this.testDirectory);
      } catch (ex) {
        if (this.isLocal) {
          throw ex;
        } else {
          // In CI, don't worry if the test directory was not able to be deleted
        }
      }
      this.testDirectory = null;
      this._scripts = null;
    }
  }
};
