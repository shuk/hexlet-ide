/** @jsx React.DOM */

/* global require */

var $ = jQuery = require("jquery/dist/jquery");

require("bootstrap/dist/css/bootstrap.css");
require("fuelux/dist/css/fuelux.css");
require("codemirror/lib/codemirror.css");

var rpc = require("./rpc");
var websocket = require("./socket");

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
var TerminalsActions = require("editor/actions/TerminalsActions");

rpc.ready(function(proxy) {
  TreeActions.loadTree();
});

websocket.on('connect', function() {
  TerminalsActions.startCreateTerminal();

  websocket.on("terminalCreated", function(msg) {
    TerminalsActions.finishCreateTerminal(msg);
  });

  websocket.on("data", function(msg) {
    TerminalsActions.finishUpdateTerminal(msg);
  });

  websocket.on("disconnect", function() {
    //TODO: maybe destroy terminals or store action in buffer
  });
});

$(function() {
  React.renderComponent(<Ide />, $("#hexlet-ide").get(0));
});
