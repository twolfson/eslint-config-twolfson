// Load in dependencies
var assert = require('assert');
var eslintConfigTwolfson = require('../');

// Start our tests
describe('eslint-config-twolfson', function () {
  it('returns awesome', function () {
    assert.strictEqual(eslintConfigTwolfson(), 'awesome');
  });
});
