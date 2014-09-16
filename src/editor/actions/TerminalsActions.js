/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var ActionTypes = IdeConstants.ActionTypes;
var socket = require("editor/socket");

var TerminalsActions = {
  startCreateTerminal: function() {
    socket.emit("createTerminal");
  },

  finishCreateTerminal: function(msg) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TERMINALS_CREATE_TERMINAL,
      id: msg.id
    });
  },

  startUpdateTerminal: function(msg) {
    socket.emit("updateTerminal", msg);
  },

  finishUpdateTerminal: function(msg) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TERMINALS_UPDATE_TERMINAL,
      id: msg.id,
      data: msg.data
    });
  },

  selectTerminal: function(terminal) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TERMINALS_SELECT_TERMINAL,
      id: terminal.id
    });
  },

  closeTerminal: function(terminal) {
    socket.emit("closeTerminal", { id: terminal.id });
    AppDispatcher.dispatch({
      actionType: ActionTypes.TERMINALS_CLOSE_TERMINAL,
      id: terminal.id
    });
  }
};

module.exports = TerminalsActions;
