/* global require module */
var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var BaseStore = require("./BaseStore");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var state = {
  isVisible: false,
  coords: { x: 0, y: 0 },
  options: {}
};

var ContextMenuStore = BaseStore.extend({
  isVisible: function() {
    return state.isVisible;
  },

  getCoords: function() {
    return state.coords;
  },

  getItems: function() {
    return state.items;
  },

  getState: function() {
    return state;
  }
});

AppDispatcher.registerHandler(ActionTypes.CONTEXT_MENU_SHOW, function(payload) {
  state.isVisible = true;
  state.coords = payload.coords;
  state.options = payload.options;
  ContextMenuStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.CONTEXT_MENU_HIDE, function() {
  state.isVisible = false;
  ContextMenuStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.IDE_GLOBAL_CLICK, function() {
  state.isVisible = false;
  ContextMenuStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.MODAL_OPEN, function() {
  state.isVisible = false;
  ContextMenuStore.emitChange();
});

module.exports = ContextMenuStore;
