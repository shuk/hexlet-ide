/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var CodexConstants = require("editor/constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

var CodexActions = {
    globalClick: function() {
        "use strict";
        AppDispatcher.dispatch({
            actionType: ActionTypes.CODEX_GLOBAL_CLICK
        });
    }
};

module.exports = CodexActions;
