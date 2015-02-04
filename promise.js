var fs = require('fs');

function _resolve(deferred, value) {
  if (value && typeof value.promise) {
    value.then(function(res) {
      deferred.resolve(res);
    }, function(err) {
      deferred.reject(err);
    });
    return;
  }

  deferred.resolve(value);
}

function defer() {
  var cb, eb;

  var promise = {
    then: function(_cb, _eb) {
      var _deferred = defer();

      _eb = _eb || function(err) {
        throw err;
      };

      cb = function(_res) {
        var res;

        try {
          res = _cb(_res);
        } catch (e) {
          _deferred.reject(e);
          return;
        }

        _resolve(_deferred, res);
      };

      eb = function(_err) {
        try {
          _eb(_err);
        } catch (e) {
          _deferred.reject(e);
        }
      };

      return _deferred.promise;
    }
  };

  var deferred = {
    promise: promise,

    resolve: function(res) {
      if (cb) cb(res);
    },

    reject: function(err) {
      if (err && eb) eb(err);
    }
  };

  return deferred;
}

function readFile(file) {
  var deferred = defer();

  fs.readFile(file, 'utf8', function(err, res) {
    if (err) {
      deferred.reject(err);
      return;
    }
    deferred.resolve(res);
  });

  return deferred.promise;
}

readFile('clue1.txt').then(function(res) {
  return readFile(res.trim());
}).then(function(res) {
  return readFile(res.trim());
}).then(function(res) {
  console.log(res);
}, function(err) {
  console.log('Handling: ', err.stack);
})
;
