/** @jsx React.DOM */

var _ = require("lodash");
var Immutable = require("immutable");
var React = require("react/addons");

var Tree = require("./Tree");
var Modal = require("editor/components/Modal");
var ContextMenu = require("./ContextMenu");
var TreeStore = require("editor/stores/TreeStore");
var ModalStore = require("editor/stores/ModalStore");
var TreeActions = require("editor/actions/TreeActions");

var IdeConstants = require("editor/constants/IdeConstants");
var ActionTypes = IdeConstants.ActionTypes;

function getState() {
  return {
    tree: TreeStore.getRoot(),
    modalData: ModalStore.get("tree"),
    contextMenu: TreeStore.getContextMenu()
  };
}

var TreeBox = React.createClass({
  // propTypes: {
  // nodeLabel: React.PropTypes.renderable.isRequired
  // defaultCollapsed: React.PropTypes.bool,
  // },

  getInitialState: function() {
    return getState();
  },

  handleOpenCreateFolderModal: function(parentId) {
    TreeActions.openCreateFolderModal(parentId);
  },

  handleOpenRemoveFolderModal: function(id) {
    TreeActions.openRemoveFolderModal(id);
  },

  handleOpenCreateFileModal: function(parentId) {
    TreeActions.openCreateFileModal(parentId);
  },

  handleOpenRemoveFileModal: function(id) {
    TreeActions.openRemoveFileModal(id);
  },

  handleCreateFolder: function(parentId) {
    TreeActions.createFolder(parentId, this.refs.nameInput.getDOMNode().value);
  },

  handleRemoveFolder: function(id) {
    TreeActions.removeFolder(id);
  },

  handleCreateFile: function(parentId) {
    TreeActions.createFile(parentId, this.refs.nameInput.getDOMNode().value);
  },

  handleRemoveFile: function(id) {
  },

  buildContextMenuChildren: function() {
    var contextMenu = this.state.contextMenu;

    contextMenuChildren = [];
    contextMenuChildren.push([
      {onClick: this.handleOpenCreateFolderModal.bind(this, contextMenu.id), title: "new folder"},
      {onClick: this.handleOpenCreateFileModal.bind(this, contextMenu.id), title: "new file"}
    ]);

    if (contextMenu.type === "file") {
      contextMenuChildren.push([{onClick: this.handleOpenRemoveFolderModal.bind(this, contextMenu.id), title: "remove file"}]);
    } else if (contextMenu.type === "folder") {
      contextMenuChildren.push([{onClick: this.handleOpenRemoveFolderModal.bind(this, contextMenu.id), title: "remove folder"}]);
    } else {
      throw "xxx";
    }

    return contextMenuChildren;
  },

  render: function() {
    var modalData = this.state.modalData;
    var contextMenu = this.state.contextMenu;

    var modal = null;
    switch (modalData.type) {
      case ActionTypes.TREE_OPEN_CREATE_FOLDER_MODAL:
        modal =
        <Modal title={"create folder"} onApply={this.handleCreateFolder.bind(this, modalData.id)}>
          <form action="">
            <input type="text" name="folderName" ref="nameInput" />
          </form>
        </Modal>;
        break;

        case ActionTypes.TREE_OPEN_REMOVE_FOLDER_MODAL:
          modal =
          <Modal title={"remove folder"} onApply={this.handleRemoveFolder.bind(this, modalData.id)}>
            {"Are you sure?"}
          </Modal>;
          break;

          case ActionTypes.TREE_OPEN_CREATE_FILE_MODAL:
            modal =
            <Modal title={"create file"} onApply={this.handleCreateFile.bind(this, modalData.id)}>
              <form action="">
                <input type="text" ref="nameInput" />
              </form>
            </Modal>;
            break;

            case ActionTypes.TREE_OPEN_REMOVE_FILE_MODAL:
              modal =
              <Modal title={"remove file"} onApply={this.handleRemoveFile.bind(this, modalData.id)}>
                {"Are you sure?"}
              </Modal>;
              break;
    }

    return (
      <div className="fuelux">
        {contextMenu ?
          <ContextMenu>
            {this.buildContextMenuChildren()}
          </ContextMenu>
          : null}
          {modal}
          {this.state.tree !== undefined ?
            <ul className="tree" role="tree">
              <Tree key={"tree_" + this.state.tree.id} tree={this.state.tree} />
            </ul>
            : null}
          </div>
    );
  },

  componentDidMount: function() {
    TreeStore.addChangeListener(this._onChange);
    ModalStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TreeStore.removeChangeListener(this._onChange);
    ModalStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = TreeBox;
