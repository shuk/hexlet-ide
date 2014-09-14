/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var ActionTypes = IdeConstants.ActionTypes;
var TreeStore = require("editor/stores/TreeStore");
var rpc = require("editor/rpc");

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

  save: function(tab) {
    "use strict";
    var filePath = TreeStore.getPath(tab.id);
    rpc.fs.write(filePath, tab.content).onReady(function() {
      AppDispatcher.dispatch({
        actionType: ActionTypes.TABS_SAVE_CURRENT,
        id: tab.id
      });
    });
  },

  openSavingModalForDirtyTab: function(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.MODAL_OPEN,
      scope: "tabs",
      data: {
        id: id,
        type: ActionTypes.TABS_OPEN_SAVING_MODAL_FOR_DIRTY_TAB
      }
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
