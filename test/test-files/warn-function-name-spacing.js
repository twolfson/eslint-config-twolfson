exports.expected = /(Unexpected space before function parentheses|Missing space before function parentheses)/i;

// FunctionDeclaration has adjacent parens to name
function declaration () {
  // Code goes here
}
void declaration;

// FunctionExpression has spaces parens from name
[].forEach(function() {
  // Code goes here
});
[].forEach(function namedExpression() {
  // Code goes here
});
