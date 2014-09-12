/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var CodexConstants = require("editor/constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

var ModalActions = {
    close: function() {
        "use strict";
        AppDispatcher.dispatch({
            actionType: ActionTypes.MODAL_CLOSE
        });
    }
};

module.exports = ModalActions;
