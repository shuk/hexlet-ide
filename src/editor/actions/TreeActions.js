/* global require module */

var path = require("path");

var rpc = require("editor/rpc");
var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var TreeStore = require("editor/stores/TreeStore");

var ActionTypes = IdeConstants.ActionTypes;


var TreeActions = {
  loadTree: function() {
    rpc.fs.tree().then(function(result) {
      // FIXME check result
      AppDispatcher.dispatch({
        actionType: ActionTypes.TREE_LOAD,
        item: result
      });
    });
  },

  toggleFolderState: function(tree) {
    "use strict";
    if (tree.state === "closed") {
      rpc.fs.tree(tree.path).then(function(result) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.TREE_OPEN_FOLDER,
          id: tree.id,
          item: result
        });
      });
    } else {
      AppDispatcher.dispatch({
        actionType: ActionTypes.TREE_CLOSE_FOLDER,
        id: tree.id
      });
    }
  },

  openFile: function(item) {
    "use strict";

    rpc.fs.read(item.path).then(function(result) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.TREE_OPEN_FILE,
        item: item,
        content: result
      });
    });
  },

  createFolder: function(parentId, name) {
    var parentFolder = TreeStore.getPathById(parentId);
    rpc.fs.mkdir(path.join(parentFolder, name)).then(function(result) {
      if (result) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.TREE_CREATE_FOLDER,
          parentId: parentId,
          item: result
        });
      }
    });
  },

  remove: function(id) {
    var folderPath = TreeStore.getPathById(id);
    var files = TreeStore.getFilesForPath(id);
    rpc.fs.unlink(folderPath).then(function(result) {
      // FIXME check result
      AppDispatcher.dispatch({
        actionType: ActionTypes.TREE_REMOVE,
        id: id,
        removedFiles: files
      });
    });
  },

  createFile: function(parentId, name) {
    var parentFolder = TreeStore.getPathById(parentId);
    rpc.fs.touch(path.join(parentFolder, name)).then(function(result) {
      if (result) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.TREE_CREATE_FILE,
          parentId: parentId,
          item: result
        });
      }
    });
  },

  rename: function(parentId, name) {
    var parentPath = TreeStore.getPathById(parentId);
    rpc.fs.rename(parentPath, name).then(function(result) {
      if (result) {
        AppDispatcher.dispatch({
          actionType: ActionTypes.TREE_RENAME,
          parentId: parentId,
          item: result
        });
      }
    });
  }
};

module.exports = TreeActions;
