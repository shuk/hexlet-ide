/* global require module */

var EventEmitter = require("events").EventEmitter;
var merge = require("react/lib/merge");
// var Immutable = require("immutable");
var _ = require("lodash");

var AppDispatcher = require("dispatcher/AppDispatcher");
var CodexConstants = require("constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

var CHANGE_EVENT = "change";

var tabs = {};

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
            _.mapValues(tabs, function(t) { t.current = false; });

            var item = payload.item;
            tabs[item.id] = {id: item.id, item: item, current: true};
            break;

        case ActionTypes.TABS_MAKE_CURRENT:
            _.mapValues(tabs, function(t) { t.current = false; });

            var tab = tabs[payload.tabId];
            tab.current = true;
            break;

        case ActionTypes.TABS_CLOSE:
            delete tabs[payload.tabId];
            console.log(tabs);
            break;
        default:
    }
    TabsStore.emitChange();
});

module.exports = TabsStore;
