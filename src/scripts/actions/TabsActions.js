/* global require module */

var AppDispatcher = require("dispatcher/AppDispatcher");
var CodexConstants = require("constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

var TabsActions = {
    closeTab: function(tab) {
        "use strict";
        AppDispatcher.dispatch({
            actionType: ActionTypes.TABS_CLOSE,
            tabId: tab.id
        });
    },

    makeCurrent: function(tab) {
        "use strict";
        AppDispatcher.dispatch({
            actionType: ActionTypes.TABS_MAKE_CURRENT,
            tabId: tab.id
        });
    }
};

module.exports = TabsActions;
