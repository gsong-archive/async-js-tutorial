function ourReadFile(file, encoding, callback) {
  process.nextTick(function() {
    callback(null, 'file contents');
  });
}

ourReadFile('text.txt', 'utf8', function(err, res) {
  console.log(res);
});

console.log('done');
