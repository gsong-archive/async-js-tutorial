function mySetImmediate(fn) {
  setTimeout(fn, 0);
}

function repeat() {
  console.log('repeat');
  for (var i=0; i < Math.pow(10, 9); i++);
  mySetImmediate(repeat);
}

repeat();
