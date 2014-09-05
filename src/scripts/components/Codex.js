/** @jsx React.DOM */

var TreeBox = require("components/tree/TreeBox");
var TabsBox = require("components/tabs/TabsBox");
var React = require("react/addons");

var Codex = React.createClass({
    render: function() {
        return (
            <div className="row">
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
