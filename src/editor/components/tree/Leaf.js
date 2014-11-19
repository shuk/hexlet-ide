var _ = require("lodash");
var React = require("react/addons");

var TreeActions = require("editor/actions/TreeActions");

var Leaf = React.createClass({
  handleOpenFile: function(leaf, e) {
    TreeActions.openFile(leaf);
  },

  handleContextMenu: function(leaf, e) {
    this.props.handleContextMenu(e, leaf);
  },

  render: function() {
    var leaf = this.props.leaf;
    if (!leaf) return null;

    return (
      <li className="tree-item" data-template="treeitem" role="treeitem">
        <button className="tree-item-name"
          onContextMenu={this.handleContextMenu.bind(this, leaf)}
          onDoubleClick={this.handleOpenFile.bind(this, leaf)}>

          <span className="glyphicon icon-file glyphicon-file"></span>
          <span className="tree-label">{leaf.name}</span>
        </button>
      </li>
    );
  }
});

module.exports = Leaf;
