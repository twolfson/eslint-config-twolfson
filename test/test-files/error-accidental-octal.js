// Define our expectations for the test
exports.expected = /Octal literals should not be used/i;

// We only allow `0oXXX` syntax for octals
var foo = 0100;
void foo;
