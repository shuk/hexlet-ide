/** @jsx React.DOM */

var TreeBox = require("components/tree/Box.js");
var TabsBox = require("components/tabs/Box.js");

var Codex = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-md-5">
                    <TreeBox nodes={this.props.treeNodes} />
                </div>
                <div class="col-md-7">
                    <TabsBox tabs={this.props.tabsData} />
                </div>
            </div>
        );
    }
});

module.exports = Codex;
