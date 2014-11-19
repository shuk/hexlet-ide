/* global require module */
var _ = require("lodash");

var Terminal = require("xterm.js/src/xterm");

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var BaseStore = require("./BaseStore");

var terminals = {};
var terminalSequence = 1;

var TerminalsStore = BaseStore.extend({
  getAll: function() {
    return terminals;
  },

  getCurrent: function() {
    return _.find(terminals, "current");
  },

  getNextSequence: function() {
    return terminalSequence++;
  }
});

AppDispatcher.registerHandler(ActionTypes.TERMINALS_CREATE_TERMINAL, function(payload) {
  terminals[payload.id] = {
    id: payload.id,
    terminal: new Terminal({
      cols: payload.params.cols,
      rows: payload.params.rows,
      screenKeys: true,
      useStyle: true,
    })
  };
  _.each(terminals, function(t) { t.current = false; });
  terminals[payload.id].current = true;
  TerminalsStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TERMINALS_UPDATE_TERMINAL, function(payload) {
  var terminal = terminals[payload.id];
  terminal.terminal.write(payload.data);
});

AppDispatcher.registerHandler(ActionTypes.TERMINALS_SELECT_TERMINAL, function(payload) {
  _.each(terminals, function(t) { t.current = false; });
  terminals[payload.id].current = true;
  TerminalsStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TERMINALS_CLOSE_TERMINAL, function(payload) {
  var term = terminals[payload.id];
  delete terminals[payload.id];
  if (term.current) {
    var terms = _.values(terminals);
    if (terms.length > 0) {
      terms[0].current = true;
    }
  }
  TerminalsStore.emitChange();
});

module.exports = TerminalsStore;
