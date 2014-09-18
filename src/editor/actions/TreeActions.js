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

  remove: function(id) {
    // var rpc = new Eureca.Client();
    var folderPath = TreeStore.getPath(id);
    var files = TreeStore.getFilesForPath(id);
    rpc.fs.unlink(folderPath).onReady(function(result) {
      // FIXME check result
      AppDispatcher.dispatch({
        actionType: ActionTypes.TREE_REMOVE,
        id: id,
        removedFiles: files
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

  rename: function(parentId, name) {
    var parentPath = TreeStore.getPath(parentId);
    rpc.fs.rename(parentPath, name).onReady(function(result) {
      // FIXME check result
      AppDispatcher.dispatch({
        actionType: ActionTypes.TREE_RENAME,
        parentId: parentId,
        item: result
      });
    });
  }
};

module.exports = TreeActions;
