/* global module require  */

var io = require("socket.io-client");
var _ = require("lodash");

var Config = require("editor/config");

var rpc = require("../lib/rpc");

var socket = io.connect(Config.rpc.url, Config.rpc.options);

_.each(Config.rpc.events, function(callback, name) {
  "use strict";
  socket.on(name, callback);
});

module.exports = rpc.createClient(socket);
