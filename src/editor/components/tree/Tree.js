var _ = require("lodash");
var React = require("react/addons");

var TreeActions = require("editor/actions/TreeActions");
var TreeStore = require("editor/stores/TreeStore");
var Leaf = require("./Leaf");

var Tree = React.createClass({
  handleToggleFolderState: function(tree) {
    TreeActions.toggleFolderState(tree);
  },

  handleContextMenu: function(tree, e) {
    this.props.handleContextMenu(e, tree);
  },

  getChildren: function(tree) {
    return _.sortBy(tree.children, ["type", "name"]);
  },

  render: function() {
    var { tree, ...other } = this.props;

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

    return (
      <li className={treeBranchClasses} data-template="treebranch" data-name={tree.name}
        onContextMenu={this.handleContextMenu.bind(this, tree)} role="treeitem" aria-expanded="false">
        <div className="tree-branch-header">
          <button className="tree-branch-name" data-name={tree.name}
            onClick={this.handleToggleFolderState.bind(this, tree)}>
            <span className="glyphicon icon-caret glyphicon-play"></span>
            <span className={folderIconClasses} data-name={tree.name}> </span>
            <span className="tree-label" data-name={tree.name}>{tree.name}</span>
          </button>
        </div>

        {tree.children !== undefined ?
          <ul className={childrenClasses} role="group">
            {this.getChildren(tree).map(function(item) {
              switch(item.type) {
                case "directory":
                  return <Tree {...other} key={"tree_" + item.id} tree={item} />
                  break;
                case "file":
                  return <Leaf {...other} key={"leaf_" + item.id} leaf={item} />
                  break;
                default:
                  throw "xxx"
              }
            }, this)}
          </ul>
          : null}
        </li>
    );
  }
});

module.exports = Tree;
