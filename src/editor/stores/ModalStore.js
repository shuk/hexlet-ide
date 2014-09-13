/* global require module */

var EventEmitter = require("events").EventEmitter;
var merge = require("react/lib/merge");
// var Immutable = require("immutable");

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var ActionTypes = IdeConstants.ActionTypes;

var CHANGE_EVENT = "change";

var modal = false;
var currentScope = null;

var ModalStore = merge(EventEmitter.prototype, {
    get: function(scope) {
        if (!modal) {
            return false;
        } else if (scope === currentScope) {
            return modal;
        } else {
            return false;
        }
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

        case ActionTypes.MODAL_CLOSE:
            modal = false;
        break;

        case ActionTypes.MODAL_OPEN:
            modal = payload.data;
            currentScope = payload.scope;
        break;
    }

    ModalStore.emitChange();
});

module.exports = ModalStore;
