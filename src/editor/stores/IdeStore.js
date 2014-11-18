/* global require module */
var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var BaseStore = require("./BaseStore");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var state = {
  isLoaded: false,
  fullScreen: false
};

var IdeStore = BaseStore.extend({
  getState: function() {
    return state;
  }
});

AppDispatcher.registerHandler(ActionTypes.IDE_LOADED, function() {
  state.isLoaded = true;
  IdeStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.IDE_TOGGLE_FULL_SCREEN, function() {
  state.fullScreen = !state.fullScreen;
  IdeStore.emitChange();
});

module.exports = IdeStore;
