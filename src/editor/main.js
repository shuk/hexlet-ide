/** @jsx React.DOM */

/* global require */
require("bootstrap/dist/css/bootstrap.css");
require("fuelux/dist/css/fuelux.css");
require("codemirror/lib/codemirror.css");
require("codemirror/theme/solarized.css");

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

var TreeActions = require("editor/actions/TreeActions");
var TerminalsActions = require("editor/actions/TerminalsActions");
var IdeActions = require("editor/actions/IdeActions");

function HexletIdeWidget(domElement) {
  this.domElement = domElement;
  this.rpc = require("./rpc");
  this.bindEvents();
  this.render();
}

HexletIdeWidget.prototype.bindEvents = function() {
  this.rpc.ready(function(proxy) {
    TreeActions.loadTree();
    IdeActions.loadCompleted();
  });

  //FIXME: это хак, пока не сделано дуплексное RPC между клиентом и сервером
  this.rpc.socket.on("terminalUpdated", function(msg) {
    TerminalsActions.finishUpdateTerminal(msg);
  });
}

HexletIdeWidget.prototype.render = function() {
  return React.renderComponent(<Ide />, this.domElement);
}

HexletIdeWidget.prototype.runCommand = function(cmd) {
  TerminalsActions.runCommandInNewTerminal(cmd, { cols: 160, row: 16 });
}

HexletIdeWidget.prototype.exec = function(cmd) {
  return this.rpc.run.exec(cmd);
}

var HexletIde = {
  create: function(domElement, options) {
    return new HexletIdeWidget(domElement, options);
  }
};

if (typeof window !== "undefined") {
  window.HexletIde = HexletIde;
} else if (typeof module !== "undefined") {
  module.exports = HexletIde;
}
