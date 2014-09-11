/** @jsx React.DOM */

var React = require("react/addons");

var TreeBox = require("editor/components/tree/TreeBox");
var TabsBox = require("editor/components/tabs/TabsBox");
var CodexActions = require("editor/actions/CodexActions");

var Codex = React.createClass({
    handleGlobalClick: function() {
        CodexActions.globalClick()
    },

    render: function() {
        return (
            <div className="row" onClick={this.handleGlobalClick}>
                <div className="col-md-4">
                    <TreeBox />
                </div>
                <div className="col-md-8">
                    <TabsBox />
                </div>
            </div>
        );
    }
});

module.exports = Codex;
