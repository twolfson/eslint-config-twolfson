// Define our constants
//    http://eslint.org/docs/user-guide/configuring#configuring-rules
var OFF = 'off';
var WARN = 'warn';
var ERROR = 'error';
var CALLBACK_NAMES = [
  'callback', 'cb', // Generic async
  'done', // Mocha,
  'next', // Express
  'reject', 'resolve', // Promises
  'setTimeout', 'setImmediate', 'process.nextTick' // Async methods
];
// err, error, err2, reqErr, reqError, reqErr2
// DEV: This doesn't match `stderr`
var ERROR_NAME_REGEXP_STR = '^(err\d*|error\d*|[a-z]+Err\d*|[a-z]+Error\d*)$';

// Define our configuration
module.exports = {
  // Inherit from recommended styles
  extends: 'eslint:recommended',

  // Define our additional rules
  //   http://eslint.org/docs/rules
  rules: {
    // SECTION: Possible errors
    // SKIPPED: `no-await-in-loop`
    // SKIPPED: `no-compare-neg-zero`
    // Don't allow assignment in conditionals
    // IMPORTANT: This rule is considered important
    'no-cond-assign': [ERROR, 'always'],
    // Warn when `console` is used (project can enable in CLI-only files/usage)
    // IMPORTANT: This rule is considered important
    'no-console': WARN,
    // Allow constant-only conditionals
    // DEV: We often use contant-only conditionals to prevent whitepsace noise in future PRs
    'no-constant-condition': OFF,
    // Disallow hidden characters (likely accidental)
    'no-control-regex': ERROR,
    // Warn when `debugger` is used (fine for dev but CI tests should fail)
    'no-debugger': WARN,
    // Prevent developer insanity by only allowing 1 argument/key/case
    // IMPORTANT: These rules are considered important
    'no-dupe-args': ERROR,
    'no-dupe-keys': ERROR,
    'no-duplicate-case': ERROR,
    // Allow empty block statements in dev but don't allow it on master
    // DEV: This warning is easily remedied with a comment
    'no-empty': WARN,
    // Prevent wasting unnecessary space in a regexp with empty `[]` classes
    'no-empty-character-class': WARN,
    // Prevent accidentally overwriting other variables with `catch` params
    // IMPORTANT: This rule is considered important
    'no-ex-assign': ERROR,
    // More rules...
    'no-extra-boolean-cast': WARN,
    'no-extra-parens': OFF,
    'no-extra-semi': WARN,
    'no-func-assign': WARN,
    // Disallow nested function declarations (function expressions are fine)
    //   Allows nested variable declarations though
    'no-inner-declarations': [ERROR, 'functions'],
    // More rules...
    'no-invalid-regexp': ERROR,
    'no-irregular-whitespace': WARN,
    'no-obj-calls': ERROR,
    // Allow using `Object.prototype` methods when they should exist
    'no-prototype-builtins': OFF,
    // Allow multiple spaces in regexp as it feels like an "it depends" for each scenario
    'no-regex-spaces': OFF,
    // Allow arrays to be declared as we wish
    'no-sparse-arrays': OFF,
    // Assume people know when to use template strings/not
    // DEV: Enabling this could also lead to issues with other templating languages
    'no-template-curly-in-string': OFF,
    // More rules...
    'no-unexpected-multiline': ERROR,
    // Warn people when code is unreachable (useful in dev)
    'no-unreachable': WARN,
    // More rules...
    'no-unsafe-finally': ERROR,
    'use-isnan': ERROR,
    // Let JSDoc itself generate errors, ignore it in our linting
    'valid-jsdoc': OFF,
    // Error out when typeof is useless
    'valid-typeof': ERROR,

    // SECTION: Best practices
    // Allow us to have `get` without a matcing `set` (or vice versa)
    'accessor-pairs': OFF,
    // Warn developers when not using appropriate array method (e.g. `map` instead of `forEach`)
    'array-callback-return': WARN,
    // More rules...
    'block-scoped-var': WARN,
    // Allow instance/class methods to be interchanged based on API, not on usage of `this`
    'class-methods-use-this': OFF,
    // SKIPPED: `complexity`
    // Encourage returns to be consistent except for when we eager return callbacks
    // IMPORTANT: This rule is considered important
    'consistent-return': [WARN, {treatUndefinedAsUnspecified: true}],
    // Always require curly braces as code can be unpredictable
    curly: [ERROR, 'all'],
    // More rules...
    'dot-notation': WARN,

    // SECTION: Variables
    // Warn instead of error out on unused variables
    'no-unused-vars': [WARN, {vars: 'all', args: 'none', caughtErrors: 'none'}],

    // SECTION: Node.js and CommonJS
    // Enforce using a `return` with callbacks
    // IMPORTANT: This rule is considered important
    'callback-return': [ERROR, CALLBACK_NAMES],
    // Enforce handling errors from error-first callback
    // IMPORTANT: This rule is considered important
    'handle-callback-err': [ERROR, ERROR_NAME_REGEXP_STR],

    // SECTION: Stylistic issues
    indent: [WARN, 2 /* spaces */, {
      SwitchCase: 1 // indent level (default is 0)
    }],
    'max-len': [WARN, {
      code: 120, // characters
      ignoreComments: false,
      ignoreTrailingComments: false,
      ignoreUrls: true,
      ignoreStrings: false,
      ignoreTemplateLiterals: false,
      ignoreRegExpLiterals: false
    }]
  }
};
