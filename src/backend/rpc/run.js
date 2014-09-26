/* global require process module console */
var exec = require("child_process").exec;
var when = require("when");

module.exports = function(options) {
  return {
    exec: function(command) {
      return when.promise(function(resolve) {
        exec(command, function(error, stdout, stderr) {
          resolve({
            error: error,
            stdout: stdout,
            stderr: stderr
          });
        });
      });
    }
  };
};
