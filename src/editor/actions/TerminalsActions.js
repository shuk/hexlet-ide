/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var ActionTypes = IdeConstants.ActionTypes;

var rpc = require("editor/rpc");

var TerminalsActions = {
  createTerminal: function(params) {
    rpc.terminal.create(params).then(function(msg) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.TERMINALS_CREATE_TERMINAL,
        id: msg.id,
        params: msg.params
      });
    });
  },

  runCommandInNewTerminal: function(cmd, params) {
    rpc.terminal.create(params).then(function(msg) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.TERMINALS_CREATE_TERMINAL,
        id: msg.id,
        params: msg.params
      });

      rpc.terminal.update({ id: msg.id, data: cmd + "\n" });
    });
  },

  runCommand: function(terminal, cmd) {
    rpc.terminal.update({ id: terminal.id, data: cmd + "\n" });
  },

  startUpdateTerminal: function(msg) {
    rpc.terminal.update(msg);
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
    rpc.terminal.destroy({id: terminal.id }).then(function() {
      AppDispatcher.dispatch({
        actionType: ActionTypes.TERMINALS_CLOSE_TERMINAL,
        id: terminal.id
      });
    });
  }
};

module.exports = TerminalsActions;
