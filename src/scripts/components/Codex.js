/** @jsx React.DOM */

var TreeBox = require("components/tree/Box.js");

var Codex = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <TreeBox nodes={this.props.treeNodes} />
                </div>
            </div>
        );
    }
});

module.exports = Codex;
