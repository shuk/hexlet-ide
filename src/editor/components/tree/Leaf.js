/** @jsx React.DOM */

var _ = require("lodash");
var Immutable = require("immutable");
var React = require("react/addons");

var TreeActions = require("editor/actions/TreeActions");

var Leaf = React.createClass({
    handleOpenFile: function(tree, e) {
        TreeActions.openFile(tree);
    },

    handleContextMenu: function(id, type, e) {
        e.preventDefault();
        TreeActions.openContextMenu(id, type, e.clientX, e.clientY);
    },

    render: function() {
        var leaf = this.props.leaf;

        if (undefined == leaf) {
            return null;
        }

        return (
            <li className="tree-item" data-template="treeitem" role="treeitem">
                <button className="tree-item-name"
                    onContextMenu={this.handleContextMenu.bind(this, leaf.id, "file")}
                    onDoubleClick={this.handleOpenFile.bind(this, leaf)}>
                    <span className="glyphicon icon-item fueluxicon-bullet"></span>
                    <span className="tree-label">{leaf.name}</span>
                </button>
            </li>
        );
    }
});

module.exports = Leaf;
