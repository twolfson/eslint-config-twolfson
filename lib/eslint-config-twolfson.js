// Define our constants
//    http://eslint.org/docs/user-guide/configuring#configuring-rules
var OFF = 'off';
var WARN = 'warn';
var ERROR = 'error';

// Define our configuration
module.exports = {
  // Inherit from recommended styles
  extends: 'eslint:recommended',

  // Define our additional rules
  rules: {
    // Define our possible errors
    //   http://eslint.org/docs/rules/#possible-errors
    // Don't allow assignment in conditionals
    'no-cond-assign': [ERROR, 'always'],
    // Warn when `console` is used (project can enable in CLI-only files/usage)
    'no-console': [WARN, {allow: []}],
    // Warn instead of error out on unused variables
    'no-unused-vars': [WARN, {vars: 'all', args: 'none', caughtErrors: 'none'}],
    // Allow constant-only conditionals
    // DEV: We often use contant-only conditionals to prevent whitepsace noise in future PRs
    'no-constant-condition': OFF,

    // Define our stylistic issues
    //   http://eslint.org/docs/rules/#stylistic-issues
    indent: [WARN, 2 /* spaces */]
  }
};
