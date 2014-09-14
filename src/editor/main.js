/** @jsx React.DOM */

/* global require */

var $ = jQuery = require("jquery/dist/jquery");

require("bootstrap/dist/css/bootstrap.css");
require("fuelux/dist/css/fuelux.css");
require("codemirror/lib/codemirror.css");

var rpc = require("./rpc");

var key = require("keymaster");

key.filter = function(event) {
    return true;
}

require("codemirror/mode/javascript/javascript");
require("codemirror/mode/jade/jade");

require("bootstrap/dist/js/bootstrap");

var React = require("react/addons");

var Ide = require("editor/components/Ide");
var TreeActions = require("editor/actions/TreeActions");

rpc.ready(function(proxy) {
    TreeActions.loadTree();
});

$(function() {
    React.renderComponent(<Ide />, $("#hexlet-ide").get(0));
});

window.addEventListener('load', function() {
  var socket = io.connect();
  socket.on('connect', function() {
    var term = new Terminal({
      cols: 80,
      rows: 24,
      screenKeys: true,
      useStyle: true,
      cursorBlink: true
    });

    term.on('data', function(data) {
      socket.emit('data', data);
    });

    term.on('title', function(title) {
      document.title = title;
    });

    term.open(document.getElementById("#terminal"));

    term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n');

    socket.on('data', function(data) {
      term.write(data);
    });

    socket.on('disconnect', function() {
      term.destroy();
    });
  });
}, false);
