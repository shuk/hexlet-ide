/* global module require */

var io = require("socket.io-client");

var rpc = require("../rpc");

var socket = io.connect();

module.exports = rpc.createClient(socket);
