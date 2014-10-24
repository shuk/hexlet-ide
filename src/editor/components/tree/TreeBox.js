/** @jsx React.DOM */
var React = require("react/addons");

var WatchStoreMixin = require("editor/mixins/WatchStore");

var Tree = require("./Tree");
var TreeStore = require("editor/stores/TreeStore");

var TreeActions = require("editor/actions/TreeActions");
var ContextMenuActions = require("editor/actions/ContextMenuActions");
var ModalActions = require("editor/actions/ModalActions");

var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var TreeBox = React.createClass({
  // propTypes: {
  // nodeLabel: React.PropTypes.renderable.isRequired
  // defaultCollapsed: React.PropTypes.bool,
  // },
  mixins: [ WatchStoreMixin(TreeStore) ],

  getFluxState: function() {
    return {
      tree: TreeStore.getRoot(),
    };
  },

  handleOpenCreateFolderModal: function(parentId) {
    ModalActions.showModal({
      title: "Create folder",
      onApply: function(modal) {
        TreeActions.createFolder(parentId, modal.refs.nameInput.getDOMNode().value);
      },
      content: function() {
        return (
          <input type="text" name="folderName" ref="nameInput" />
        );
      }
    });
  },

  handleOpenRenameModal: function(item) {
    ModalActions.showModal({
      title: "Rename",
      onApply: function(modal) {
        TreeActions.rename(item.id, modal.refs.nameInput.getDOMNode().value);
      },
      content: function() {
        return (
          <input type="text" name="folderName" ref="nameInput" defaultValue={item.name} />
        );
      }
    });
  },

  handleOpenRemoveFolderModal: function(id) {
    ModalActions.showModal({
      title: "Remove folder",
      onApply: function(modal) {
        TreeActions.remove(id);
      },
      content: function() {
        return <p>Are you sure?</p>;
      }
    });
  },

  handleOpenCreateFileModal: function(parentId) {
    ModalActions.showModal({
      title: "Create file",
      onApply: function(modal) {
        TreeActions.createFile(parentId, modal.refs.nameInput.getDOMNode().value);
      },
      content: function() {
        return <input type="text" name="folderName" ref="nameInput" />
      }
    });
  },

  handleOpenRemoveFileModal: function(id) {
    ModalActions.showModal({
      title: "Remove file",
      onApply: function(modal) {
        TreeActions.remove(id);
      },
      content: function() {
        return <p>Are you sure?</p>;
      }
    });
  },

  getContextMenuItems: function(item) {
    var contextMenuChildren = [];

    if (item.type === "directory") {
      contextMenuChildren.push([
        {onClick: this.handleOpenCreateFolderModal.bind(this, item.id), title: "New folder"},
        {onClick: this.handleOpenCreateFileModal.bind(this, item.id), title: "New file"}
      ]);

      contextMenuChildren.push([
        {onClick: this.handleOpenRemoveFolderModal.bind(this, item.id), title: "Remove folder"},
        {onClick: this.handleOpenRenameModal.bind(this, item), title: "Rename"}
      ]);
    }

    if (item.type === "file") {
      contextMenuChildren.push([
        {onClick: this.handleOpenRemoveFileModal.bind(this, item.id), title: "Remove file"},
        {onClick: this.handleOpenRenameModal.bind(this, item), title: "Rename"}
      ]);
    }

    return contextMenuChildren;
  },

  handleContextMenu: function(e, item, type) {
    e.preventDefault();
    var coords = {
      x: e.clientX,
      y: e.clientY
    };
    var items = this.getContextMenuItems(item, type);
    ContextMenuActions.showContextMenu(coords, items);
  },

  render: function() {
    return (
      <div className="fuelux">
        {this.state.tree ?
        <ul className="tree" role="tree">
          <Tree key={"tree_" + this.state.tree.id} tree={this.state.tree} handleContextMenu={this.handleContextMenu} />
        </ul>
        : null}
      </div>
    );
  }
});

module.exports = TreeBox;
