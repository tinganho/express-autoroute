
var glob = require('glob'),
    path = require('path');

module.exports = function(files, app) {
  var caller    = getCaller(),
      callerDir = path.dirname(caller.filename);

  var _files = [];
  for(var i = 0; i<files.length; i++) {
    _files = _files.concat(
      glob.sync(
        files[i],
      {
        cwd: callerDir
      })
    );
  }

  for(var i = 0; i < _files.length; i++) {
    require(path.join(callerDir, _files[i]))(app);
  }
};

function getCaller() {
  var stack = getStack()

  // Remove superfluous function calls on stack
  stack.shift() // getCaller --> getStack
  stack.shift() // omfg --> getCaller

  // Return caller's caller
  return stack[1].receiver
}

function getStack() {
  // Save original Error.prepareStackTrace
  var origPrepareStackTrace = Error.prepareStackTrace

  // Override with function that just returns `stack`
  Error.prepareStackTrace = function (_, stack) {
    return stack
  }

  // Create a new `Error`, which automatically gets `stack`
  var err = new Error()

  // Evaluate `err.stack`, which calls our new `Error.prepareStackTrace`
  var stack = err.stack

  // Restore original `Error.prepareStackTrace`
  Error.prepareStackTrace = origPrepareStackTrace

  // Remove superfluous function call on stack
  stack.shift() // getStack --> Error

  return stack
}
