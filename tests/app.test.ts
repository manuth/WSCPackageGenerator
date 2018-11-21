'use strict';
const assert = require('yeoman-assert');
import * as Path from 'path';
import * as helpers from 'yeoman-test';

describe('WSCPackageGenerator', () =>
{
  before(() =>
  {
    return helpers.run(
      Path.join(__dirname, '../generators/app')).withPrompts({ someAnswer: true });
  });

  describe('creates files', () =>
  {
    let filename = 'dummyfile.txt';
    it(filename, () => 
    {
      assert.file([filename]);
    });
  });
});
