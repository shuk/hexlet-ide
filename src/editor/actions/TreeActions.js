/* global require module */

var path = require("path");

var rpc = require("editor/rpc");
var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var TreeStore = require("editor/stores/TreeStore");

var ActionTypes = IdeConstants.ActionTypes;


var TreeActions = {
  loadTree: function() {
    rpc.fs.tree().onReady(function(result) {
      // FIXME check result
      AppDispatcher.dispatch({
        actionType: ActionTypes.TREE_LOAD,
        item: result
      });
    });
  },

  toggleFolderState: function(id) {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.TREE_TOGGLE_FOLDER_STATE,
      id: id
    });
  },

  openFile: function(item) {
    "use strict";

    // var rpc = new Eureca.Client();
    // FIXME calculate path
    rpc.fs.read(item.path).onReady(function(result) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.TREE_OPEN_FILE,
        item: item,
        content: result
      });
    });
  },

  openContextMenu: function(id, type, x, y) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TREE_OPEN_CONTEXT_MENU,
      id: id,
      type: type,
      x: x,
      y: y
    });
  },

  openCreateFolderModal: function(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.MODAL_OPEN,
      scope: "tree",
      data: {
        id: id,
        type: ActionTypes.TREE_OPEN_CREATE_FOLDER_MODAL
      }
    });
  },

  openRemoveFolderModal: function(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.MODAL_OPEN,
      scope: "tree",
      data: {
        id: id,
        type: ActionTypes.TREE_OPEN_REMOVE_FOLDER_MODAL
      }
    });
  },

  openCreateFileModal: function(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.MODAL_OPEN,
      scope: "tree",
      data: {
        id: id,
        type: ActionTypes.TREE_OPEN_CREATE_FILE_MODAL
      }
    });
  },

  openRemoveFileModal: function(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.MODAL_OPEN,
      scope: "tree",
      data: {
        id: id,
        type: ActionTypes.TREE_OPEN_REMOVE_FILE_MODAL
      }
    });
  },

  createFolder: function(parentId, name) {
    // var rpc = new Eureca.Client();
    var parentFolder = TreeStore.getPath(parentId);
    rpc.fs.mkdir(path.join(parentFolder, name)).onReady(function(result) {
      // FIXME check result
      AppDispatcher.dispatch({
        actionType: ActionTypes.TREE_CREATE_FOLDER,
        parentId: parentId,
        item: result
      });
    });
  },

  removeFolder: function(id) {
    // var rpc = new Eureca.Client();
    var folderPath = TreeStore.getPath(id);
    rpc.fs.unlink(folderPath).onReady(function(result) {
      // FIXME check result
      AppDispatcher.dispatch({
        actionType: ActionTypes.TREE_REMOVE_FOLDER,
        id: id
      });
    });
  },

  createFile: function(parentId, name) {
    // var rpc = new Eureca.Client();
    var parentFolder = TreeStore.getPath(parentId);
    rpc.fs.touch(path.join(parentFolder, name)).onReady(function(result) {
      // FIXME check result
      AppDispatcher.dispatch({
        actionType: ActionTypes.TREE_CREATE_FILE,
        parentId: parentId,
        item: result
      });
    });
  },

  removeFile: function() {
  }
};

module.exports = TreeActions;
