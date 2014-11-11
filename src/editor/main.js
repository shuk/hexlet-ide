/** @jsx React.DOM */
require("./dependencies");

var key = require("keymaster");

key.filter = function(event) {
  return true;
}

var React = require("react/addons");
var Config = require("editor/config");

function HexletIdeWidget(domElement, options) {
  Config.extend(options);
}

HexletIdeWidget.prototype.render = function(domElement, rpcConfig) {
  var Ide = require("editor/components/Ide");
  return React.renderComponent(<Ide rpcConfig={rpcConfig}/>, domElement);
}

var HexletIde = {
  create: function(domElement, options) {
    return new HexletIdeWidget(options).render(domElement, options);
  },

  Component: function(options, cmd, onExec) {
    Config.extend(options);
    var Ide = require("editor/components/Ide");
    return <Ide rpcConfig={options} cmd={cmd} onExec={onExec}/>;
  }
};

if (typeof window !== "undefined") {
  window.HexletIde = HexletIde;
}
if (typeof module !== "undefined") {
  module.exports = HexletIde;
}
