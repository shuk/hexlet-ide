/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var ActionTypes = IdeConstants.ActionTypes;

var IdeActions = {
    globalClick: function() {
        "use strict";
        AppDispatcher.dispatch({
            actionType: ActionTypes.IDE_GLOBAL_CLICK
        });
    }
};

module.exports = IdeActions;
