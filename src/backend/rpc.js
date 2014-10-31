/* global module require */
var rpc = require("../lib/rpc");

module.exports = function(io, options) {
  rpc.createServer(io, {
    fs: require("./rpc/fs")(options),
    terminal: require("./rpc/terminal")(options),
    run: require("./rpc/run")(options)
  });
};
