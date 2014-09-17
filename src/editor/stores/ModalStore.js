/* global require module */
var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var BaseStore = require("./BaseStore");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var state = {
  isVisible: false,
  content: function() {
    return null;
  },
  title: "",
  onApply: function() {},
  onClose: function() {}
};

var ModalStore = BaseStore.extend({
  getState: function() {
    return state;
  }
});

AppDispatcher.registerHandler(ActionTypes.MODAL_CLOSE, function() {
  state.isVisible = false;
  ModalStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.MODAL_OPEN, function(payload) {
  state.isVisible = true;
  state.content = payload.options.content;
  state.onApply = payload.options.onApply;
  state.onClose = payload.options.onClose;
  state.title = payload.options.title;
  ModalStore.emitChange();
});

module.exports = ModalStore;
