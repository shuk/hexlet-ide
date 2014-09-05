/* global require module */

var EventEmitter = require("events").EventEmitter;
var merge = require("react/lib/merge");
var Immutable = require("immutable");
var _ = require("lodash");

var AppDispatcher = require("dispatcher/AppDispatcher");
var CodexConstants = require("constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

var CHANGE_EVENT = "change";

var tree = [
    {name: "Test Folder 1", type: "folder", state: "closed", id: "F1",
        children: [
            { name: "Test Sub Folder 1", type: "folder", state: "closed", id: "FF1",
                children: [{name: "test item", type: "item", id: "fff3"}]},
                { name: "Test Sub Folder 2", type: "folder", state: "closed", id: "FF2" },
                { name: "Test Item 2 in Folder 1", type: "item", id: "FI2" }
        ]},
        { name: "Test Folder 2", type: "folder", state: "closed",  id: "F2" },
        { name: "Test Item 1", type: "item", id: "I1" },
        { name: "Test Item 2", type: "item", id: "I2" }
];

function replaceIn(id, ancestry, nodes) {
    "use strict";
    var index = _.findIndex(nodes, {id: id});
    var item = nodes[index];

    if (undefined === ancestry || ancestry.length === 0) {
        item.state = (item.state === "opened") ? "closed" : "opened";
    } else {
        var children = item.children;
        item.children = replaceIn(ancestry.first(), ancestry.rest(), children);
    }
    return nodes;
}

var TreeStore = merge(EventEmitter.prototype, {
    getAll: function() {
        return tree;
    },

    getOpenedInTabs: function() {
        return [
            Immutable.fromJS({ name: "Test Item 2", type: "item", id: "I2" })
        ];
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
        case ActionTypes.TREE_TOGGLE_FOLDER_STATE:
            var ancestry = payload.ancestry;
            tree = replaceIn(ancestry.first(), ancestry.rest(), tree);
            break;
        default:
    }
    TreeStore.emitChange();
});

module.exports = TreeStore;
