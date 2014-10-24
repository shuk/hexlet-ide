/* global require module */
var _ = require("lodash");

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var BaseStore = require("./BaseStore");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var editors = [];

var EditorsStore = BaseStore.extend({
  getAll: function() {
    return editors;
  },

  getCurrent: function() {
    return _.find(editors, { current: true });
  }
});

AppDispatcher.registerHandler(ActionTypes.TREE_OPEN_FILE, function(payload) {
  editors.map(function(t) { t.current = false; });

  var item = payload.item;
  var content = payload.content;

  var editor = _.find(editors, {id: item.id});
  if (!editor) {
    editors.push({id: item.id, dirty: false, name: item.name, current: true, content: content});
  } else {
    editor.current = true;
  }

  EditorsStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.EDITORS_EDIT_CURRENT, function(payload) {
  var editor = _.find(editors, {id: payload.id});
  editor.content = payload.content;
  editor.dirty = true;

  EditorsStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.EDITORS_SAVE_CURRENT, function(payload) {
  var editor = _.find(editors, {id: payload.id});
  editor.dirty = false;

  EditorsStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.EDITORS_MAKE_CURRENT, function(payload) {
  editors.map(function(t) { t.current = false; });

  var editor = _.find(editors, {id: payload.id});
  editor.current = true;

  EditorsStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.EDITORS_CLOSE, function(payload) {
  editors = _.filter(editors, function(t) { return t.id !== payload.id; });

  if (editors.length > 0) {
    var editor = _.last(editors);
    editor.current = true;
  }

  EditorsStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TREE_REMOVE, function(payload) {
  var currentEditor = EditorsStore.getCurrent();

  var removedFiles = payload.removedFiles;
  editors = _.filter(editors, function(t) { return !_.contains(removedFiles, t.id); });

  var needSelectNewEditor = !_.contains(editors, currentEditor) && editors.length > 0;

  if (needSelectNewEditor) {
    var editor = _.last(editors);
    editor.current = true;
  }

  EditorsStore.emitChange();
});

// AppDispatcher.registerHandler(ActionTypes.TABS_FLUSH_CONTENT, function(payload) {
//   tab = tabs[payload.id];
//   if (tab !== undefined) {
//     tabs[payload.id].content = payload.content;
//   }
// });

module.exports = EditorsStore;
