/* global require module */

var Client = require("./Client");
var Server = require("./Server");

module.exports = {
  createServer: function(io, rpcMethods) {
    return new Server(io, rpcMethods);

  },

  createClient: function(socket) {
    return new Client(socket);
  }
};
