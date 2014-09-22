/** @jsx React.DOM */

/* global require */
require("bootstrap/dist/css/bootstrap.css");
require("fuelux/dist/css/fuelux.css");
require("codemirror/lib/codemirror.css");

var key = require("keymaster");

key.filter = function(event) {
  return true;
}

var $ = jQuery = require("jquery/dist/jquery");

require("codemirror/mode/javascript/javascript");
require("codemirror/mode/jade/jade");

require("bootstrap/dist/js/bootstrap");
require("editor/styles/application.css");

var React = require("react/addons");
var Ide = require("editor/components/Ide");

function bindServerEvents() {
  var rpc = require("./rpc");
  var socket = require("./socket");

  var TreeActions = require("editor/actions/TreeActions");
  var TerminalsActions = require("editor/actions/TerminalsActions");

  rpc.ready(function(proxy) {
    TreeActions.loadTree();
  });

  socket.on('connection', function() {
    TerminalsActions.startCreateTerminal();
  });

  socket.on("terminalCreated", function(msg) {
    TerminalsActions.finishCreateTerminal(msg);
  });

  socket.on("terminalUpdated", function(msg) {
    TerminalsActions.finishUpdateTerminal(msg);
  });

  socket.on("disconnect", function() {
    //TODO: maybe destroy terminals or store action in buffer
  });
}

var HexletIde = {
  create: function(domElement, options) {
    bindServerEvents();
    return React.renderComponent(<Ide />, domElement);
  }
};

window.HexletIde = HexletIde;

module.exports = HexletIde;

