/** @jsx React.DOM */

var _ = require("lodash");
var Immutable = require("immutable");
var React = require("react/addons");

var Tree = require("./Tree");
var Modal = require("editor/components/Modal");
var ContextMenu = require("./ContextMenu");
var TreeStore = require("editor/stores/TreeStore");
var TreeActions = require("editor/actions/TreeActions");

var CodexConstants = require("editor/constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

function getState() {
    return {
        tree: TreeStore.getRoot(),
        modalData: TreeStore.getModal(),
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

    handleCreateFolder: function(parentId) {
        TreeActions.createFolder(parentId, this.refs.nameInput.getDOMNode().value);
    },

    handleNewFileModal: function(parentId) {
    },

    handleRemoveFolder: function(id) {
        TreeActions.removeFolder(id);
    },

    handleRemoveFile: function(id) {
    },

    buildContextMenuChildren: function() {
        var contextMenu = this.state.contextMenu;

        contextMenuChildren = [];
        contextMenuChildren.push([
                {onClick: this.handleOpenCreateFolderModal.bind(this, contextMenu.id), title: "new folder"},
                {onClick: this.handleNewFileModal.bind(this, contextMenu.id), title: "new file"}
        ]);

        if (contextMenu.type === "file") {
            contextMenuChildren.push([{onClick: this.handleRemoveFile.bind(this, contextMenu.id), title: "remove file"}]);
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
                            <input type="text" ref="nameInput" />
                        </form>
                    </Modal>;
                break;
            case ActionTypes.TREE_OPEN_REMOVE_FOLDER_MODAL:
                modal =
                    <Modal title={"remove folder"} onApply={this.handleRemoveFolder.bind(this, modalData.id)}>
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
    },

    componentWillUnmount: function() {
        TreeStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = TreeBox;
