// FunctionDeclaration has adjacent parens to name
function declaration() {
  // Code goes here
}
void declaration;

// FunctionExpression has spaces parens from name
[].forEach(function () {
  // Code goes here
});
// DEV: Historically we used a space after name for inline functions but we're making our style more consistent
//   due to limited ESLint flexibility and general consistency
[].forEach(function namedExpression() {
  // Code goes here
});
