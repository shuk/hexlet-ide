/* global require module */

var EventEmitter = require("events").EventEmitter;
var merge = require("react/lib/merge");
// var Immutable = require("immutable");
var _ = require("lodash");

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var CodexConstants = require("editor/constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

var CHANGE_EVENT = "change";

var tabs = {};

var TabsStore = merge(EventEmitter.prototype, {
    getAll: function() {
        return tabs;
    },

    getCurrent: function() {
        return _.find(tabs, "current");
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
            var content = payload.content;
            tabs[item.id] = {id: item.id, edited: false, name: item.name, current: true, content: content};

            TabsStore.emitChange();
            break;

        case ActionTypes.TABS_EDIT_CURRENT:
            var tab = tabs[payload.id];
            tab.content = payload.content;
            tab.edited = true;

            TabsStore.emitChange();
            break;

        case ActionTypes.TABS_SAVE_CURRENT:
            var tab = tabs[payload.id];
            tab.edited = false;

            TabsStore.emitChange();
            break;

        case ActionTypes.TABS_MAKE_CURRENT:
            _.mapValues(tabs, function(t) { t.current = false; });

            var tab = tabs[payload.id];
            tab.current = true;

            TabsStore.emitChange();
            break;

        case ActionTypes.TABS_CLOSE:
            delete tabs[payload.id];

            TabsStore.emitChange();
            break;

        // case ActionTypes.TABS_FLUSH_CONTENT:
        //     tab = tabs[payload.id];
        //     if (tab !== undefined) {
        //         tabs[payload.id].content = payload.content;
        //     }
        //     break;

        default:
    }
});

module.exports = TabsStore;
