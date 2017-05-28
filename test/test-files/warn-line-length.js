// Define our expectations for the test
exports.expected = /Line . exceeds the maximum line length of 120/i;

// We don't allow statements over 120 characters
var statement = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
void statement; // DEV: This is to silence variables not being used
