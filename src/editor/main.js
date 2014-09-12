/** @jsx React.DOM */

/* global require */

var $ = jQuery = require("jquery/dist/jquery");

require("bootstrap/dist/css/bootstrap.css");
require("fuelux/dist/css/fuelux.css");
require("codemirror/lib/codemirror.css");

var key = require("keymaster");

key.filter = function(event) {
    return true;
}

require("codemirror/mode/javascript/javascript");
require("codemirror/mode/jade/jade");

require("bootstrap/dist/js/bootstrap");

var React = require("react/addons");

var Codex = require("editor/components/Codex");
var TreeActions = require("editor/actions/TreeActions");

TreeActions.loadTree();

$(function() {
    React.renderComponent(<Codex />, $("#codex").get(0));
});
