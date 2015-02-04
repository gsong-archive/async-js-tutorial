var fs = require('fs');

function readFile(file, cb) {
  if (file === 'text.txt') {
    setImmediate(function() {
      cb(null, 'This is text');
    });
    return;
  }
  fs.readFile(file, 'utf8', cb);
}

readFile('text.txt', function(err, result) {
  if (err) throw err;
  console.log(result);
});

console.log('done');
