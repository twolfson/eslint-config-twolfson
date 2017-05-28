// Define our constants
//    http://eslint.org/docs/user-guide/configuring#configuring-rules
var OFF = 'off';
var WARN = 'warn';
var ERROR = 'error';

// Define our configuration
module.exports = {
  // Inheret from recommended styles
  extends: 'eslint:recommended',

  // Define our additional rules
  rules: {
    indent: [ERROR, 2 /* spaces */],
    // Warn instead of error out on unused variables
    //   http://eslint.org/docs/rules/no-unused-vars
    'no-unused-vars': [WARN, {vars: 'all', args: 'none', caughtErrors: 'none'}]
  }
};
