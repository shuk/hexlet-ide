/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var ActionTypes = IdeConstants.ActionTypes;
var TerminalsStore = require("editor/stores/TerminalsStore");

var rpc = require("editor/rpc");
var _ = require("lodash");

var TerminalsActions = {
  createTerminal: function(params) {
    var id = TerminalsStore.getNextSequence();
    AppDispatcher.dispatch({
      actionType: ActionTypes.TERMINALS_CREATE_TERMINAL,
      id: id,
      params: params
    });

    var options = _.merge({ id: id}, params);
    rpc.terminal.create(options);
  },

  createDefaultTerminal: function(params) {
    var id = TerminalsStore.getNextSequence();
    AppDispatcher.dispatch({
      actionType: ActionTypes.TERMINALS_CREATE_TERMINAL,
      id: id,
      params: params
    });

    var options = _.merge({ id: id}, params);
    rpc.terminal.createDefault(options);
  },

  reconnectTerminals: function() {
    _.each(TerminalsStore.getAll(), function(terminal) {
      rpc.terminal.reconnect({ id: terminal.id });
    });
  },

  runCommandInNewTerminal: function(cmd, params) {
    var id = TerminalsStore.getNextSequence();
    AppDispatcher.dispatch({
      actionType: ActionTypes.TERMINALS_CREATE_TERMINAL,
      id: id,
      params: params
    });

    var options = _.merge({ id: id }, params);
    rpc.terminal.create(options).then(function() {
      rpc.terminal.update({ id: id, data: cmd + "\n" });
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
  },

  resize: function(msg) {
    rpc.terminal.resize(msg);
  }
};

module.exports = TerminalsActions;
