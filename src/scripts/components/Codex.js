/** @jsx React.DOM */

var TreeBox = require("components/tree/Box");
var TabsBox = require("components/tabs/Box");
var React = require("React");

var Codex = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <TreeBox nodes={this.props.treeNodes} />
                </div>
                <div className="col-md-8">
                    <TabsBox tabsData={this.props.tabsData} />
                </div>
            </div>
        );
    }
});

module.exports = Codex;
