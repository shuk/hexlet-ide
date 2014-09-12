/* global require module */

var EventEmitter = require("events").EventEmitter;
var merge = require("react/lib/merge");
var Immutable = require("immutable");
var _ = require("lodash");
var TreeModel = require("tree-model");

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var CodexConstants = require("editor/constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

var CHANGE_EVENT = "change";

var contextMenu = false;

var tree = new TreeModel();
var root = undefined;

var TreeStore = merge(EventEmitter.prototype, {
    getRoot: function() {
        return root !== undefined ? root.model : root;
    },

    getPath: function(id) {
        var node = root.first(function(node) { return node.model.id === id; });
        return node.getPath().map(function(node){ return node.model.name; }).join("/");
    },

    getContextMenu: function() {
        return contextMenu;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(payload) {
    switch(payload.actionType) {
        case ActionTypes.TREE_LOAD:
            var item = payload.item;
            root = tree.parse(item);
            break;
        case ActionTypes.TREE_TOGGLE_FOLDER_STATE:
            var id = payload.id;
            var node = root.first(function(node) { return node.model.id === id; });
            var model = node.model;
            model.state = (model.state === "opened") ? "closed" : "opened";
            break;

        case ActionTypes.TREE_OPEN_CONTEXT_MENU:
            contextMenu = {id: payload.id, type: payload.type, x: payload.x, y: payload.y};
            break;

        case ActionTypes.CODEX_GLOBAL_CLICK:
            contextMenu = false;
            break;

        case ActionTypes.TREE_CREATE_FOLDER:
            var parentId = payload.parentId;
            var item = payload.item;
            var node = root.first(function(node) { return node.model.id === parentId; });
            var newNode = tree.parse(item);
            node.addChild(newNode);
            break;

        case ActionTypes.TREE_REMOVE_FOLDER:
            var id = payload.id;
            var node = root.first(function(node) { return node.model.id === id; });
            node.drop();
            break;

        case ActionTypes.TREE_CREATE_FILE:
            var parentId = payload.parentId;
            var item = payload.item;
            var node = root.first(function(node) { return node.model.id === parentId; });
            var newNode = tree.parse(item);
            node.addChild(newNode);
            break;

        case ActionTypes.TREE_REMOVE_FILE:
        break;

        case ActionTypes.TREE_RELOAD:
            // TODO
            break;

        default:
    }
    TreeStore.emitChange();
});

module.exports = TreeStore;
