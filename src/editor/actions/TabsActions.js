/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var CodexConstants = require("editor/constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;

var TabsActions = {
    flushTabContent: function(id, content) {
        "use strict";
        AppDispatcher.dispatch({
            actionType: ActionTypes.TABS_FLUSH_CONTENT,
            id: id,
            content: content
        });
    },

    closeTab: function(tab) {
        "use strict";
        AppDispatcher.dispatch({
            actionType: ActionTypes.TABS_CLOSE,
            id: tab.id
        });
    },

    makeCurrent: function(tab) {
        "use strict";
        AppDispatcher.dispatch({
            actionType: ActionTypes.TABS_MAKE_CURRENT,
            id: tab.id
        });
    }
};

module.exports = TabsActions;
