/** @jsx React.DOM */

var _ = require("lodash");
var Immutable = require("immutable");
var React = require("react/addons");

var Leaf = require("./Leaf");
var TreeActions = require("actions/TreeActions");

var Tree = React.createClass({
    toggleFolderStateHandler: function(ancestry) {
        TreeActions.toggleFolderState(ancestry);
    },

    renderSubTree: function(item) {
        var cx = React.addons.classSet;

        var treeBranchClasses = cx({
            "tree-open": "opened" == item.state,
            "tree-branch": true
        });

        var folderIconClasses = cx({
            "glyphicon": true,
            "icon-folder": true,
            "glyphicon-folder-open": "opened" == item.state,
            "glyphicon-folder-close": "closed" == item.state,

        });

        var childrenClasses = cx({
            "hide": "closed" == item.state,
            "tree-branch-children": true
        });

        var newAncestry = this.props.ancestry.push(item.id);

        return (
            <li key={item.id} className={treeBranchClasses} data-template="treebranch" role="treeitem" aria-expanded="false">
                <div className="tree-branch-header">
                    <button className="tree-branch-name" onClick={_.partial(this.toggleFolderStateHandler, newAncestry)}>
                        <span className="glyphicon icon-caret glyphicon-play"></span>
                        <span className={folderIconClasses}></span>
                        <span className="tree-label">{item.name}</span>
                    </button>
                </div>
                <ul className={childrenClasses} role="group">
                    <Tree ancestry={newAncestry} nodes={item.children} />
                </ul>
            </li>
        );
    },

    render: function() {
        var nodes = this.props.nodes;
        if (undefined == nodes) {
            return null;
        }
        var items = this.props.nodes.map(function(item) {
            // var object = item.toObject();
            switch(item.type) {
                case "folder":
                    return this.renderSubTree(item);
                case "item":
                    return <Leaf key={item.id} item={item} />;
                default:
                    // FIXME exception
                    break;
            }
        }, this);

        return (
            <div>
                {items}
            </div>
        );
    }
});

module.exports = Tree;
