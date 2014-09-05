/* global require module */

var AppDispatcher = require("dispatcher/AppDispatcher");
var CodexConstants = require("constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

var TabsActions = {
    openFile: function(item) {
        "use strict";
        AppDispatcher.dispatch({
            actionType: ActionTypes.TABS_OPEN_FILE,
            item: item
        });
    }
};

module.exports = TabsActions;
