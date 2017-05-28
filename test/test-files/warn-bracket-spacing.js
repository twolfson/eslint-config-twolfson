exports.expected = /There should be no space (before|after) '(\[|\])'/i;

var foo;
foo = [ 'bar' ];
foo = { bar: 'baz' };
foo = { bar: { baz: true } };
foo = [ {
  bar: ['baz', 'baz']
} ];
void foo;
