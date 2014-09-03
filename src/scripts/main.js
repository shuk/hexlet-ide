/** @jsx React.DOM */

/* global require */

var Codex = require("./components/Codex.js")

$(function() {
    React.renderComponent(<Codex name="ehu" /> , $("#codex").get(0));
});
