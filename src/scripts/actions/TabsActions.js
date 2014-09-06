/* global require module */

var AppDispatcher = require("dispatcher/AppDispatcher");
var CodexConstants = require("constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

var TabsActions = {
    flushTabContent: function(id, content) {
        "use strict";
        AppDispatcher.dispatch({
            actionType: ActionTypes.TABS_FLUSH_CONTENT,
            tabId: id,
            content: content
        });
    },

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
