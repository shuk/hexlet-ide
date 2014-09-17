/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

module.exports = {
  showContextMenu: function(coords, options) {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.CONTEXT_MENU_SHOW,
      coords: coords,
      options: options
    });
  },

  hideContextMenu: function() {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.CONTEXT_MENU_HIDE
    });
  }
};
