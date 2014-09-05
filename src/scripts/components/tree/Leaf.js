/** @jsx React.DOM */

var React = require("react");
var TreeActions = require("actions/TreeActions");

var Leaf = React.createClass({
    openFileHandler: function(e) {
        TreeActions.openFile(this.props.item);
    },

    render: function() {
        var item = this.props.item

        return (
            <li className="tree-item" data-template="treeitem" role="treeitem">
                <button className="tree-item-name" onDoubleClick={this.openFileHandler}>
                    <span className="glyphicon icon-item fueluxicon-bullet"></span>
                    <span className="tree-label">{item.name}</span>
                </button>
            </li>
        );
    }
});

module.exports = Leaf;
