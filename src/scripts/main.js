/** @jsx React.DOM */

/* global require */

var Codex = require("components/Codex.js");
var React = require("react/lib/React");
var $ = require("jquery/dist/jquery.js");

var treeData = [
    {name: "Test Folder 1", type: "folder", state: "closed", id: "F1",
        children: [
            { name: "Test Sub Folder 1", type: "folder", state: "closed", id: "FF1" },
            { name: "Test Sub Folder 2", type: "folder", state: "closed", id: "FF2" },
            { name: "Test Item 2 in Folder 1", type: "item", id: "FI2" }
        ]},
        { name: "Test Folder 2", type: "folder", state: "closed",  id: "F2" },
        { name: "Test Item 1", type: "item", id: "I1" },
        { name: "Test Item 2", type: "item", id: "I2" }
];


$(function() {
    React.renderComponent(<Codex treeNodes={treeData} />, $("#codex").get(0));
});
