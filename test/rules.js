// Load in dependencies
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
        configFile: eslintConfigFilepath,
        useEslintrc: false
      });

      // Lint our file and save the results
      var report = cli.executeOnFiles([filepath]);
      this.report = report;
    });
    after(function cleanup () {
      delete this.report;
    });
  }
};

// Start our tests
glob.sync('test-files/error-*.js', {cwd: __dirname}).forEach(function checkErrorFile (_filepath) {
  var filepath = path.join(__dirname, _filepath);
  describe('An invalid file "' + _filepath + '"', function () {
    describe('when linted', function () {
      testUtils.lint(filepath);

      it('receives its expected error', function () {
        var expected = require(filepath).expected;
        expect(this.report.errorCount).to.be.at.least(1);
        expect(this.report.warningCount).to.equal(0);
      });
    });
  });
});

glob.sync('test-files/ignore-*.js', {cwd: __dirname}).forEach(function checkIgnoreFile (_filepath) {
  var filepath = path.join(__dirname, _filepath);
  describe.only('A valid file "' + _filepath + '"', function () {
    describe('when linted', function () {
      testUtils.lint(filepath);

      it('has no errors and no warnings', function () {
        expect(this.report.errorCount).to.equal(0);
        expect(this.report.warningCount).to.equal(0);
      });
    });
  });
});

glob.sync('test-files/warn-*.js', {cwd: __dirname}).forEach(function checkWarnFile (_filepath) {
  var filepath = path.join(__dirname, _filepath);
  describe('A warning valid file "' + _filepath + '"', function () {
    describe('when linted', function () {
      testUtils.lint(filepath);

      it('has no errors', function () {
        expect(this.report.errorCount).to.equal(0);
      });

      it('receives its expected warning', function () {
        // TODO: Add expected check
        expect(this.report.warningCount).to.be.at.least(1);
        expect(false).to.equal(true);
      });
    });
  });
});
