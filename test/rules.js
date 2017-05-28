// Load in dependencies
var assert = require('assert');
var expect = require('chai').expect;
var glob = require('glob');
var path = require('path');
var eslint = require('eslint');

// Load in our config
var eslintConfigFilepath = require.resolve('../');

// Define test utilities
var testUtils = {
  lint: function (filepath) {
    before(function lintFn () {
      // Define our CLI engine
      // http://eslint.org/docs/developer-guide/nodejs-api#executeonfiles
      var cli = new eslint.CLIEngine({
        envs: ['node'],
        configFile: eslintConfigFilepath,
        useEslintrc: false
      });

      // Lint our file and save the results
      // report = {
      //    results: [{filePath, messages: [messageObj, ...], errorCount: 1, warningCount: 0}],
      //    errorCount: 1, warningCount: 0}
      // messageObj = {
      //    ruleId: 'no-undef', severity: 2, message: '... is not defined',
      //    line, column, nodeType: 'Identifier', source: 'exports.exports = ...'}
      var report = cli.executeOnFiles([filepath]);
      this.result = report.results[0];
      this.messageStr = this.result.messages.map(function extractMessageStr (messageObj) {
        return messageObj.message;
      }).join('\n');
    });
    after(function cleanup () {
      delete this.result;
    });
  }
};

// Resolve our files
var testFiles = glob.sync('test-files/*.js', {cwd: __dirname});
var errorFiles = glob.sync('test-files/error-*.js', {cwd: __dirname});
var offFiles = glob.sync('test-files/off-*.js', {cwd: __dirname});
var warnFiles = glob.sync('test-files/warn-*.js', {cwd: __dirname});

// Verify we have no unmatched files
var unmatchedTestFiles = new global.Set(testFiles);
errorFiles.forEach(unmatchedTestFiles.delete.bind(unmatchedTestFiles));
offFiles.forEach(unmatchedTestFiles.delete.bind(unmatchedTestFiles));
warnFiles.forEach(unmatchedTestFiles.delete.bind(unmatchedTestFiles));
unmatchedTestFiles = Array.from(unmatchedTestFiles);
assert.strictEqual(unmatchedTestFiles.length, 0,
  'Unmatched test files found: ' + JSON.stringify(unmatchedTestFiles) + '. ' +
  'Verify they are prefixed with "error-", "off-", or "warn-"');

// Start our tests
errorFiles.forEach(function checkErrorFile (_filepath) {
  var filepath = path.join(__dirname, _filepath);
  describe('An invalid file "' + _filepath + '"', function () {
    describe('when linted', function () {
      testUtils.lint(filepath);

      it('receives its expected error', function () {
        var expected = require(filepath).expected; assert(expected);
        expect(this.result.errorCount).to.be.at.least(1);
        expect(this.result.warningCount).to.equal(0);
        expect(this.messageStr).to.match(expected);
      });
    });
  });
});

offFiles.forEach(function checkOffFile (_filepath) {
  var filepath = path.join(__dirname, _filepath);
  describe('A valid file "' + _filepath + '"', function () {
    describe('when linted', function () {
      testUtils.lint(filepath);

      it('has no errors and no warnings', function () {
        expect(this.result.errorCount).to.equal(0);
        expect(this.result.warningCount).to.equal(0);
      });
    });
  });
});

warnFiles.forEach(function checkWarnFile (_filepath) {
  var filepath = path.join(__dirname, _filepath);
  describe('A warning valid file "' + _filepath + '"', function () {
    describe('when linted', function () {
      testUtils.lint(filepath);

      it('has no errors', function () {
        expect(this.result.errorCount).to.equal(0);
      });

      it('receives its expected warning', function () {
        var expected = require(filepath).expected; assert(expected);
        expect(this.result.warningCount).to.be.at.least(1);
        expect(this.messageStr).to.match(expected);
      });
    });
  });
});
