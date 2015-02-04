var fs = require('fs');

function read(file) {
  return function(callback) {
    fs.readFile(file.trim(), 'utf8', callback);
  };
}

function *sizes(/* files */) {
  var files = Array.prototype.slice.call(arguments);

  var thunks = files.map(function(file) {
    return size(file);
  });

  var results = yield thunks;

  return results.reduce(function(acc, value) {
    return acc + value;
  });
}

function size(file) {
  return function(fn) {
    fs.stat(file, function(err, res) {
      if (err) return fn(err, null);
      fn(null, res.size);
    });
  };
}

function run(fn) {
  var func = fn();

  function next(incoming) {
    var response = func.next(incoming);
    if (response.done) return;

    response.value = toThunk(response.value);
    response.value(ourCallback);

    function ourCallback(err, res) {
      if (err) func.throw(err);
      next(res);
    }
  }

  next();
}

function toThunk(obj) {
  if (typeof obj === 'function') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return arraryToThunk(obj);
  }

  throw Error('Thunk error');
}

function arraryToThunk(arr) {
  return function(fn) {
    var pending = arr.length;
    var results = new Array(arr.length);

    for (var i = 0; i < arr.length; i++) {
      resolve(arr[i], i);
    }

    function resolve(thunk, index) {
      thunk(function(err, res) {
        if (err) fn(err, null);
        results[index] = res;
        --pending || fn(null, results);
      });
    }
  };
}

run(function *() {
  var files = yield [read('clue1.txt'), read('clue2.txt')];
  console.log(files);

  var totalSize = yield *sizes('clue1.txt', 'clue2.txt', 'treasure.txt');
  console.log(totalSize);
});
