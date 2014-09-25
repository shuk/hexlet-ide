/* global require module */
var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var BaseStore = require("./BaseStore");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var state = {
  isLoaded: false
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

module.exports = IdeStore;
