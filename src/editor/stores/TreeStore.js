/* global require module Exception */
var _ = require("lodash");
var TreeModel = require("tree-model");
var shared = require("shared");

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;
var BaseStore = require("./BaseStore");

var tree = new TreeModel(shared.treeOptions);
var root;

var TreeStore = BaseStore.extend({
  getRoot: function() {
    return root !== undefined ? root.model : root;
  },

  getPath: function(id) {
    var node = root.first(function(node) { return node.model.id === id; });
    return node.getPath().map(function(node){ return node.model.name; }).join("/");
  },

  getFilesForPath: function(id) {
    var parentNode = root.first(function(node) { return node.model.id === id; });
    if (parentNode.model.type === "file") {
      return [parentNode.model.id];
    } else if (parentNode.model.type === "folder") {
      return parentNode.all(function(node) {
        return node.model.type === "file";
      }).map(function(node) {
        return node.model.id;
      });
    }
  }
});

AppDispatcher.registerHandler(ActionTypes.TREE_LOAD, function(payload) {
  var item = payload.item;
  root = tree.parse(item);
  TreeStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TREE_TOGGLE_FOLDER_STATE, function(payload) {
  var id = payload.id;
  var node = root.first(function(node) { return node.model.id === id; });
  var model = node.model;
  model.state = (model.state === "opened") ? "closed" : "opened";
  TreeStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TREE_CREATE_FOLDER, function(payload) {
  var parentId = payload.parentId;
  var item = payload.item;
  var node = root.first(function(node) { return node.model.id === parentId; });
  var newNode = tree.parse(item);
  node.addChild(newNode);
  TreeStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TREE_REMOVE, function(payload) {
  var id = payload.id;
  var node = root.first(function(node) { return node.model.id === id; });
  node.drop();
  TreeStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TREE_CREATE_FILE, function(payload) {
  var parentId = payload.parentId;
  var item = payload.item;
  var node = root.first(function(node) { return node.model.id === parentId; });
  var newNode = tree.parse(item);
  node.addChild(newNode);
  TreeStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TREE_RENAME, function(payload) {
  var parentId = payload.parentId;
  var item = payload.item;
  var node = root.first(function(node) { return node.model.id === parentId; });
  _.extend(node.model, item);
  TreeStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TREE_RELOAD, function() {
  throw new Exception("Not implemented!");
});

module.exports = TreeStore;
