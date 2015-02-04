var fs = require('fs');

function compute() {
  console.log('computing');
  for (var i=0; i < Math.pow(10, 9); i++);
  setImmediate(compute);
}

compute();

fs.readFile('text.txt', function(err, result) {
  console.log('done reading file');
});

console.log('Interrupt 1');
console.log('Interrupt 2');
