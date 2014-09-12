/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var CodexConstants = require("editor/constants/CodexConstants");
var ActionTypes = CodexConstants.ActionTypes;
var TreeStore = require("editor/stores/TreeStore");

var TabsActions = {
    // flushTabContent: function(id, content) {
    //     "use strict";
    //     AppDispatcher.dispatch({
    //         actionType: ActionTypes.TABS_FLUSH_CONTENT,
    //         id: id,
    //         content: content
    //     });
    // },

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
    },

    save: function(tab, content) {
        "use strict";
        var rpc = new Eureca.Client();
        var filePath = TreeStore.getPath(tab.id);
        rpc.ready(function (proxy) {
            proxy.fs.write(filePath, tab.content).onReady(function(result) {
                AppDispatcher.dispatch({
                    actionType: ActionTypes.TABS_SAVE_CURRENT,
                    id: tab.id
                });
            });
        });
    },

    edit: function(tab, content) {
        "use strict";
        AppDispatcher.dispatch({
            actionType: ActionTypes.TABS_EDIT_CURRENT,
            id: tab.id,
            content: content
        });
    }
};

module.exports = TabsActions;
