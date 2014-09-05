/* global require module */

var EventEmitter = require("events").EventEmitter;
var merge = require("react/lib/merge");
// var Immutable = require("immutable");
var _ = require("lodash");

var AppDispatcher = require("dispatcher/AppDispatcher");
var CodexConstants = require("constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

var CHANGE_EVENT = "change";

var tabs = [];

var TabsStore = merge(EventEmitter.prototype, {
    getAll: function() {
        return tabs;
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
        case ActionTypes.TREE_OPEN_FILE:
            var item = payload.item;
            var tab = _.find(tabs, {id: item.id});
            console.log(tab);
            if (tab === undefined) {
                tabs.push(item);
            }
            break;
        default:
    }
    TabsStore.emitChange();
});

module.exports = TabsStore;
