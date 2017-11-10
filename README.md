# eslint-config-twolfson [![Build status](https://travis-ci.org/twolfson/eslint-config-twolfson.svg?branch=master)](https://travis-ci.org/twolfson/eslint-config-twolfson)

ESLint configuration for [@twolfson][]

This was built to create a common versioned location for [@twolfson's][@twolfson] style choices. For [@twolfson's][@twolfson] JSCS and JSHint preferences, see [twolfson-style][]

[@twolfson]: http://github.com/twolfson/
[twolfson-style]: http://github.com/twolfson/twolfson-style

## Getting Started
Install our package along side `eslint` via: `npm install eslint-config-twolfson`

Once it's installed, extend our package via `.eslintrc.js`. We recommend the following setup:

```js
module.exports = {
  // Inherit from our package
  extends: 'eslint-config-twolfson',

  // Configure our environment
  // http://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    node: true,
    mocha: true
  }
};
```

Once it's configured, we can run our linter:

```bash
eslint directory/to/lint
```

## Documentation
### Preferred setup
We have the following as our preferred setup for our packages:

**.eslintrc.js:**

```js
module.exports = {
  // Inherit from our package
  extends: 'eslint-config-twolfson',

  // Configure our environment
  // http://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    node: true,
    mocha: true
  }
};
```

**package.json:**

```js
// ...
"scripts": {
  "precheck": "eslint directory/to/lint",
  "lint": "eslint directory/to/lint --max-warnings 0",
  "test": "npm run precheck && mocha && npm run lint"
},
// ...
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `npm run lint` and test via `npm test`.

## Donating
Support this project and [others by twolfson][twolfson-projects] via [donations][twolfson-support-me].

<http://twolfson.com/support-me>

[twolfson-projects]: http://twolfson.com/projects
[twolfson-support-me]: http://twolfson.com/support-me

## Unlicense
As of May 27 2017, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
