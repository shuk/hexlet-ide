/* global require module */

var EventEmitter = require("events").EventEmitter;
var merge = require("react/lib/merge");
var _ = require("lodash");

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var ActionTypes = IdeConstants.ActionTypes;

var CHANGE_EVENT = "change";

var terminals = {};

var TerminalsStore = merge(EventEmitter.prototype, {
  getAll: function() {
    return terminals;
  },

  getCurrent: function() {
    return _.find(terminals, "current");
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  switch(payload.actionType) {
    case ActionTypes.TERMINALS_CREATE_TERMINAL:
      terminals[payload.id] = {
        id: payload.id,
        terminal: new Terminal({
          cols: 80,
          rows: 24,
          screenKeys: true,
          useStyle: true,
          cursorBlink: true
        })
      };
      _.each(terminals, function(t) { t.current = false; });
      terminals[payload.id].current = true;
      TerminalsStore.emitChange();
      break;

    case ActionTypes.TERMINALS_UPDATE_TERMINAL:
      var terminal = terminals[payload.id];
      terminal.terminal.write(payload.data);
      break;

    case ActionTypes.TERMINALS_SELECT_TERMINAL:
      _.each(terminals, function(t) { t.current = false; });
      terminals[payload.id].current = true;
      TerminalsStore.emitChange();
      break;

    case ActionTypes.TERMINALS_CLOSE_TERMINAL:
      var term = terminals[payload.id];
      delete terminals[payload.id];
      if (term.current) {
        var terms = _.values(terminals);
        if (terms.length > 0) {
          terms[0].current = true;
        }
      }
      TerminalsStore.emitChange();
      break;
  }
});

module.exports = TerminalsStore;
