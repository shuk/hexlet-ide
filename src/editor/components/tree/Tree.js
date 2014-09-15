/** @jsx React.DOM */

var _ = require("lodash");
var Immutable = require("immutable");
var React = require("react/addons");

var TreeActions = require("editor/actions/TreeActions");
var TreeStore = require("editor/stores/TreeStore");
var Leaf = require("./Leaf");

var Tree = React.createClass({
  handleToggleFolderState: function(id) {
    TreeActions.toggleFolderState(id);
  },

  handleContextMenu: function(id, type, e) {
    e.preventDefault();
    TreeActions.openContextMenu(id, type, e.clientX, e.clientY);
  },

  render: function() {
    var tree = this.props.tree;

    if (undefined === tree) {
      return null;
    }

    var cx = React.addons.classSet;

    var treeBranchClasses = cx({
      "tree-open": "opened" == tree.state,
      "tree-branch": true
    });

    var folderIconClasses = cx({
      "glyphicon": true,
      "icon-folder": true,
      "glyphicon-folder-open": "opened" == tree.state,
      "glyphicon-folder-close": "closed" == tree.state,

    });

    var childrenClasses = cx({
      "hide": "closed" == tree.state,
      "tree-branch-children": true
    });

    var folderIconStyle = {
      marginRight: 10
    };

    return (
      <li className={treeBranchClasses} data-template="treebranch" data-name={tree.name} role="treeitem" aria-expanded="false">
        <div className="tree-branch-header">
          <button className="tree-branch-name" data-name={tree.name}
            onContextMenu={this.handleContextMenu.bind(this, tree.id, "folder")}
            onClick={this.handleToggleFolderState.bind(this, tree.id)}>
            <span className="glyphicon icon-caret glyphicon-play"></span>
            <span className={folderIconClasses} data-name={tree.name} style={folderIconStyle}></span>
            <span className="tree-label" data-name={tree.name}>{tree.name}</span>
          </button>
        </div>

        {tree.children !== undefined ?
          <ul className={childrenClasses} role="group">
            {tree.children.map(function(item) {
              switch(item.type) {
                case "folder":
                  return <Tree key={"tree_" + item.id} tree={item} />
                  break;
                case "file":
                  return <Leaf key={"leaf_" + item.id} leaf={item} />
                  break;
                default:
                  throw "xxx"
              }
            })}
          </ul>
          : null}
        </li>
    );
  }
});

module.exports = Tree;
