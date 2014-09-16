/* global require module */

var EventEmitter = require("events").EventEmitter;
var merge = require("react/lib/merge");
// var Immutable = require("immutable");
var _ = require("lodash");

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var ActionTypes = IdeConstants.ActionTypes;

var CHANGE_EVENT = "change";

var tabs = [];

var unsavedTabModal = false;

var TabsStore = merge(EventEmitter.prototype, {
  getAll: function() {
    return tabs;
  },

  getClosingUnsafedTabModal: function() {
    return unsavedTabModal;
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
      tabs.map(function(t) { t.current = false; });

    var item = payload.item;
    var content = payload.content;

    var tab = _.find(tabs, {id: item.id});
    if (tab === undefined) {
      tabs.push({id: item.id, dirty: false, name: item.name, current: true, content: content});
    } else {
      tab.current = true;
    }

    TabsStore.emitChange();
    break;

    case ActionTypes.TABS_EDIT_CURRENT:
      var tab = _.find(tabs, {id: payload.id});
    tab.content = payload.content;
    tab.dirty = true;

    TabsStore.emitChange();
    break;

    case ActionTypes.TABS_SAVE_CURRENT:
      var tab = _.find(tabs, {id: payload.id});
    tab.dirty = false;

    TabsStore.emitChange();
    break;

    case ActionTypes.TABS_MAKE_CURRENT:
      tabs.map(function(t) { t.current = false; });

    var tab = _.find(tabs, {id: payload.id});
    tab.current = true;

    TabsStore.emitChange();
    break;

    case ActionTypes.TABS_CLOSE:
      tabs = _.filter(tabs, function(t) { return t.id !== payload.id; });

    if (tabs.length > 0) {
      var tab = _.last(tabs);
      tab.current = true;
    }

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
