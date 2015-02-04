var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('special-event', function() {
  console.log('special-event happened');
});

emitter.on('special-event', function() {
  console.log('special-event 2');
});

console.log('before emission');
emitter.emit('special-event');
console.log('after emission');
