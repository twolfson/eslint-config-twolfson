// Define our expectations for the test
exports.expected = /Expected to return a value at the end/i;

function main(cb) {
  if (true) {
    return void cb(new Error('foo'));
  }
}
void main;
