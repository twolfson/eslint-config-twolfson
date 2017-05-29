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
  // Timers
  // https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Timers
  'setTimeout', 'setInterval', 'setImmediate', 'requestAnimationFrame',
  'window.requestAnimationFrame', 'global.requestAnimationFrame',
  'process.nextTick' // Node.js timing callback
];
// err, error, err2, reqErr, reqError, reqErr2
// DEV: This doesn't match `stderr`
var ERROR_NAME_REGEXP_STR = '^(err\\d*|error\\d*|[a-z]+Err\\d*|[a-z]+Error\\d*)$';

// Define our configuration
module.exports = {
  // Inherit from recommended styles
  extends: 'eslint:recommended',

  // Define our additional rules
  //   http://eslint.org/docs/rules
  rules: {
    // SECTION: Possible errors
    // SKIPPED: `no-await-in-loop`
    // DEV: When we use ES6, we should enforce await
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
    // Don't `default` case in switch statements
    'default-case': OFF,
    // Keep dots consistently on property when breaking lines
    'dot-location': [WARN, 'property'],
    // More rules...
    'dot-notation': WARN,
    // IMPORTANT: This rule is considered important
    eqeqeq: ERROR,
    // IMPORTANT: This rule is considered important
    'guard-for-in': ERROR,
    // SKIPPED: `no-alert`
    // Allow `arguments.caller/callee` for debugging but not after development
    'no-caller': WARN,
    // Allow hoisted variables to be hoisted, even in switches/cases
    'no-case-declarations': OFF,
    // SKIPPED: `no-div-regex`
    // Allow `else` to have a return statement (sometimes looks cleaner)
    'no-else-return': OFF,
    // Allow for normal functions to be noops but everyting else should have a comment
    'no-empty-function': [WARN, {allow: ['functions', 'arrowFunctions', 'generatorFunctions']}],
    // Notify us about destructuring typos
    'no-empty-pattern': WARN,
    // SKIPPED: no-eq-null (handled by eqeqeq)
    // Disallow eval without explicit opt-in via config comments
    // IMPORTANT: This rule is considered important
    'no-eval': ERROR,
    // Disallow adding to primitive prototypes (e.g. Object, Array)
    // IMPORTANT: This rule is considered important
    'no-extend-native': ERROR,
    // Warn about unused bind parameters
    'no-extra-bind': WARN,
    // Warn about unused labels
    'no-extra-label': WARN,
    // Error out when a fallthrough occurs (confusing to read through)
    'no-fallthrough': [ERROR, {commentPattern: 'FALLTHROUGHS ARE NOT PERMITTED. DON\'T USE THEM OR THIS COMMENT!!!'}],
    // Require numerical decimals to be more easily seen
    'no-floating-decimal': WARN,
    // More rules...
    'no-global-assign': ERROR,
    // Allow only common coercion types
    'no-implicit-coercion': [ERROR, {allow: ['!!' /* boolean */, '+' /* string concat, numeric */]}],
    // Ignore implicit globals as we typically work in module environments
    'no-implicit-globals': OFF,
    // Disallow other flavors of eval
    // IMPORTANT: This rule is considered important
    'no-implied-eval': ERROR,
    // Disallow this being used in invalid scenarios (should be `window` or `global` otherwise)
    'no-invalid-this': ERROR,
    // More rules...
    'no-iterator': ERROR,
    // Allow labels when appropriate (already rarely used)
    'no-labels': OFF,
    // Warn about excessive block usage
    'no-lone-blocks': WARN,
    // Warn about scope leaking functions
    'no-loop-func': WARN,
    // Allow magic numbers (useful in one-off assertions)
    'no-magic-numbers': OFF,
    // Allow multiple spaces when appropriate
    'no-multi-spaces': OFF,
    // Warn on multiline string usage (syntax is quirky)
    'no-multi-str': WARN,
    // Allow side effects via `new` (although we prefer `void`)
    'no-new': OFF,
    // Disallow new function as it's like eval
    'no-new-func': ERROR,
    // Allow primitive classes to be used although they're quite quirky
    'no-new-wrapper': OFF,
    // Disallow octal literals using `0XXX` instead of `0oXXX` syntax
    // IMPORTANT: This rule is considered important
    'no-octal': ERROR,
    // More rules...
    'no-octal-escape': ERROR,
    'no-param-reassign': OFF,
    'no-proto': OFF,
    'no-redeclare': WARN,
    // SKIPPED: `no-restricted-properties`
    'no-return-assign': ERROR,
    'no-return-await': WARN, // Return a promise, don't wait
    'no-script-url': WARN,
    'no-self-assign': OFF, // Likely practical
    'no-self-compare': WARN,
    'no-sequences': OFF, // Rare but practical
    'no-throw-literal': ERROR, // Require stacktraces
    'no-unmodified-loop-condition': WARN, // Developer sanity
    'no-unused-expressions': WARN, // Prefer `if/else` to short circuit and similar
    'no-unused-labels': WARN, // Keep code clean
    'no-useless-call': OFF,
    'no-useless-concat': OFF, // Allow stylistic concat
    'no-useless-escape': WARN, // Can be confusing/unintentional
    'no-useless-return': OFF, // Allow stylistic return
    'no-void': OFF, // Encourage stylistic void to show intent of noop
    'no-warning-comments': OFF, // Allow TODOs by default
    // IMPORTANT: This rule is considered important
    'no-with': ERROR, // Banish `with` to a far away place
    // IMPORTANT: This rule is considered important
    'prefer-promise-reject-errors': ERROR, // Require stack traces for error-like objects
    // IMPORTANT: This rule is considered important
    radix: ERROR, // Require radix for all parsing
    'require-await': OFF, // Allow future-proofed async functions
    'vars-on-top': OFF, // Allow stylistic var placement
    'wrap-iife': [WARN, 'outside', {functionPrototypeMethods: true}],
    yoda: [WARN, 'never', {onlyEquality: true}], // Discourage yoda expressions except for less than/greater than

    // SECTION: Strict mode
    // Banish "strict mode" to a far away place
    // DEV: We dislike strict mode messing with `arguments.callee`
    // IMPORTANT: This rule is considered important
    strict: [ERROR, 'never'],

    // SECTION: Variables
    'init-declarations': OFF, // Allow stylistic declarations
    'no-catch-shadow': ERROR, // Prevent accidental variable overwrite
    'no-delete-var': ERROR, // Prevent useless variable deletion
    'no-label-var': OFF, // Allow stylistic labels
    // SKIPPED: `no-restricted-globals`
    'no-shadow': [WARN, {builtinGlobals: true, hoist: 'all'}],
    'no-shadow-restricted-names': ERROR,
    'no-undef': ERROR,
    'no-undef-init': OFF, // Allow undefined to be set as a value
    'no-undefined': ERROR, // Same as `no-shadow-restricted-names`
    // Warn instead of error out on unused variables
    'no-unused-vars': [WARN, {vars: 'all', args: 'none', caughtErrors: 'none'}],
    // Disallow using variables before definition, allow hoisted functions/classes
    'no-use-before-define': [ERROR, {variables: true, functions: false, classes: false}],

    // SECTION: Node.js and CommonJS
    // Enforce using a `return` with callbacks
    // IMPORTANT: This rule is considered important
    'callback-return': [ERROR, CALLBACK_NAMES],
    // Enforce require at top level for eager loading
    'global-require': WARN,
    // Enforce handling errors from error-first callback
    // IMPORTANT: This rule is considered important
    'handle-callback-err': [ERROR, ERROR_NAME_REGEXP_STR],
    'no-mixed-requires': OFF, // Allow stylistic declarations
    'no-new-require': OFF, // Allow stylistic declarations
    'no-path-concat': OFF, // Allow trustworthy concat
    'no-process-env': OFF, // Allow process env usage (doesn't prevent magic checking config)
    'no-process-exit': OFF, // Allow process exit whenever
    // SKIPPED: `no-restricted-modules`
    'no-sync': OFF, // Allow sync functions when appropriate

    // SECTION: Stylistic issues
    'array-bracket-spacing': [WARN, 'never', {
      singleValue: false, objectsInArrays: false, arraysInArrays: false}],
    'block-spacing': [WARN, 'always'],
    'brace-style': [WARN, '1tbs', {allowSingleLine: true}],
    // SKIPPED: `camelcase` (libraries and templates are inconsistent)
    // SKIPPED: `capitalized-comments` (it bothers me but not worth it)
    'comma-dangle': [WARN, 'never'],
    'comma-spacing': [WARN, {before: false, after: true}],
    'comma-style': [WARN, 'last'],
    'computed-property-spacing': [WARN, 'never'],
    'consistent-this': [WARN, 'that'],
    'eol-last': [WARN, 'always'],
    'func-call-spacing': [WARN, 'never'],
    'func-name-matching': OFF,
    // SKIPPED: `func-names` (want but also need exceptions for `describe/it`
    'func-style': OFF,
    // SKIPPED: `id-blacklist`
    'id-length': OFF,
    'id-match': OFF,
    indent: [WARN, 2 /* spaces */, {
      SwitchCase: 1 // indent level (default is 0)
    }],
    'jsx-quotes': [WARN, 'prefer-double'],
    'key-spacing': [WARN, {
      beforeColon: false,
      afterColon: true,
      mode: 'minimum'
    }],
    'keyword-spacing': [WARN, {
      before: true,
      after: true
    }],
    'line-comment-position': OFF,
    'linebreak-style': [WARN, 'unix'],
    'lines-around-comment': OFF,
    'lines-around-directive': OFF,
    'max-depth': [WARN, {max: 5}], // Trust developers will know when to stop nesting
    'max-len': [WARN, {
      code: 120, // characters
      ignoreComments: false,
      ignoreTrailingComments: false,
      ignoreUrls: true,
      ignoreStrings: false,
      ignoreTemplateLiterals: false,
      ignoreRegExpLiterals: false
    }],
    'max-lines': [WARN, 500 /* Significant and insignificant */],
    'max-nested-callbacks': [WARN, {max: 5}], // Same as `max-depth`
    'max-params': [WARN, {max: 4}],
    'max-statements': OFF,
    'max-statements-per-line': [WARN, {max: 3}],
    'multiline-ternary': OFF,
    'new-cap': [WARN, {
      newIsCap: true,
      capIsNew: true,
      properties: true
    }],
    'new-parens': WARN,
    'newline-after-var': OFF,
    'newline-before-return': OFF,
    'newline-per-chained-call': OFF,
    'no-array-constructor': OFF,
    'no-bitwise': OFF,
    'no-continue': OFF,
    'no-inline-comments': OFF,
    'no-lonely-if': WARN,
    'no-mixed-operators': OFF,
    'no-mixed-spaces-and-tabs': WARN,
    'no-multi-assign': OFF,
    'no-multiple-empty-lines': [WARN, {max: 1, maxBOF: 0}],
    'no-negated-condition': OFF,
    'no-nested-ternary': WARN,
    'no-new-object': OFF,
    'no-plusplus': WARN,
    // SKIPPED: `no-restricted-syntax`
    'no-tabs': WARN,
    'no-ternary': OFF,
    'no-trailing-spaces': WARN,
    'no-underscore-dangle': OFF,
    'no-unnecessary-ternary': OFF, // Allow stylistic ternary
    'no-whitespace-before-property': WARN,
    // SKIPPED: `nonblock-statement-body-position` (`braces` overrides it)
    'object-curly-newline': OFF,
    'object-curly-spacing': [WARN, 'never', {arraysInObjects: false, objectsInObjects: false}],
    'object-property-newline': OFF,
    'one-var': [WARN, {initialized: 'never', uninitialized: 'always'}],
    // SKIPPED: `one-var-declaration-per-line` (`one-var` overrides it)
    'operator-assignment': OFF,
    'operator-linebreak': OFF,
    'padded-blocks': [WARN, 'never'],
    // IMPORTANT: This rule is considered important
    'quote-props': [WARN, 'as-needed'],
    quotes: [WARN, 'single', {avoidEscape: false, allowTemplateLiterals: true}],
    'require-jsdoc': OFF,
    semi: [WARN, 'always', {omitLastInOneLineBlock: false}],
    'semi-spacing': [WARN, {before: false, after: true}],
    'sort-keys': OFF, // Would be nice but often it's more practical for varied sort
    'sort-vars': OFF,
    'space-before-blocks': [WARN, 'always'],
    'space-before-function-paren': [WARN,
      {anonymous: 'always', named: 'never', asyncArrow: 'always'}],
    'space-in-parens': [WARN, 'never'],
    'space-infix-ops': WARN,
    'space-unary-ops': [WARN, {words: true, nonwords: false}],
    'spaced-comment': [WARN, 'always'],
    'template-tag-spacing': [ERROR, 'never'],
    'unicode-bom': [ERROR, 'never'],
    'wrap-regex': OFF

    // SECTION: ECMAScript 6
    // Skipped for now
  }
};
