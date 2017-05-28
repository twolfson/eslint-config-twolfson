// Allow catch parameters to be defined but unused
try {
  var a = 'b';
  void a;
} catch (err) {
  // Ignore error
}
