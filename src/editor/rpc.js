/* global module require window */

var io = require("socket.io-client");

var rpc = require("../rpc");

var socket = io.connect(window.location.href);

module.exports = rpc.createClient(socket);
