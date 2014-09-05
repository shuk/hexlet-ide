/** @jsx React.DOM */

/* global require */

require("stylesheets/tabs.css");

var Codex = require("components/Codex");
var React = require("react/addons");
var $ = require("jquery");

$(function() {
    React.renderComponent(<Codex />, $("#codex").get(0));
});
