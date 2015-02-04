function connect(cb) {
  var client = {};
  client.write = function(message) {
    console.log(message);
  };
  setImmediate(cb);
  return client;
}

var client = connect(function() {
  console.log('Connected');
  client.write('Works!');
});
