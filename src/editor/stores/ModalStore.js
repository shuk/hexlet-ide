/* global require module */
var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var BaseStore = require("./BaseStore");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var modal = false;
var currentScope = null;

var ModalStore = BaseStore.extend({
  get: function(scope) {
    if (!modal) {
      return false;
    } else if (scope === currentScope) {
      return modal;
    } else {
      return false;
    }
  }
});

AppDispatcher.registerHandler(ActionTypes.MODAL_CLOSE, function() {
  modal = false;
  ModalStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.MODAL_OPEN, function(payload) {
  modal = payload.data;
  currentScope = payload.scope;
  ModalStore.emitChange();
});

module.exports = ModalStore;
