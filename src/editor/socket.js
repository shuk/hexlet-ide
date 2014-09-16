/* global module io require */

var io = require("socket.io-client");

var socket = io.connect();

module.exports = socket;
