/* global require module */
var _ = require("lodash");

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var BaseStore = require("./BaseStore");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var tabs = [];
var unsavedTabModal = false;

var TabsStore = BaseStore.extend({
  getAll: function() {
    return tabs;
  },

  getClosingUnsafedTabModal: function() {
    return unsavedTabModal;
  },

  getCurrent: function() {
    return _.find(tabs, "current");
  }
});

AppDispatcher.registerHandler(ActionTypes.TREE_OPEN_FILE, function(payload) {
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

});

AppDispatcher.registerHandler(ActionTypes.TABS_EDIT_CURRENT, function(payload) {
  var tab = _.find(tabs, {id: payload.id});
  tab.content = payload.content;
  tab.dirty = true;

  TabsStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TABS_SAVE_CURRENT, function(payload) {
  var tab = _.find(tabs, {id: payload.id});
  tab.dirty = false;

  TabsStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TABS_MAKE_CURRENT, function(payload) {
  tabs.map(function(t) { t.current = false; });

  var tab = _.find(tabs, {id: payload.id});
  tab.current = true;

  TabsStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TABS_CLOSE, function(payload) {
  tabs = _.filter(tabs, function(t) { return t.id !== payload.id; });

  if (tabs.length > 0) {
    var tab = _.last(tabs);
    tab.current = true;
  }

  TabsStore.emitChange();
});

// AppDispatcher.registerHandler(ActionTypes.TABS_FLUSH_CONTENT, function(payload) {
//   tab = tabs[payload.id];
//   if (tab !== undefined) {
//     tabs[payload.id].content = payload.content;
//   }
// });

module.exports = TabsStore;
