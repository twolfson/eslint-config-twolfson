module.exports = {
  // Inheret from our package
  extends: __dirname + '/lib/eslint-config-twolfson.js',

  // Configure our environment
  // http://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    node: true,
    mocha: true
  }
};
