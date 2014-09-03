/** @jsx React.DOM */

var Leaf = require("./Leaf.js");
var _ = require("lodash/dist/lodash");
var mori = require("mori/mori.js");

var Tree = React.createClass({
    toggleFolderState: function(ancestry, e) {
        this.props.toggleFolderState(ancestry);
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

        var newAncestry = mori.conj(this.props.ancestry, item.id);

        return (
            <li className={treeBranchClasses} data-template="treebranch" role="treeitem" aria-expanded="false">
                <div className="tree-branch-header">
                    <button className="tree-branch-name" onClick={_.partial(this.toggleFolderState, newAncestry)}>
                        <span className="glyphicon icon-caret glyphicon-play"></span>
                        <span className={folderIconClasses}></span>
                        <span className="tree-label">{item.name}</span>
                    </button>
                </div>
                <ul className={childrenClasses} role="group">
                    <Tree ancestry={newAncestry} key={item.id} nodes={item.children} toggleFolderState={this.toggleFolderState} />
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
