/* global module require */
var rpc = require("../rpc");

module.exports = function(io, options) {
  rpc.createServer(io, {
    fs: require("./rpc/fs")(options)
  });
};
