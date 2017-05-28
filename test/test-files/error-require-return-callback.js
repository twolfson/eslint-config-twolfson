// Define our expectations for the test
exports.expected = /Expected return with your callback function/i;

function main(cb) {
  if (true) {
    cb(new Error('foo'));
  }
  cb(null);
}
void main;
