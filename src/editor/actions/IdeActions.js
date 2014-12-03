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
  },

  toggleFullscreen: function() {
    "use strict";
    fullscreen = !fullscreen;
    var cmd = fullscreen ? "ideFullscreen" : "ideEmbedded";
    var message = { cmd: cmd };

    window.parent.postMessage(message, "*");
    AppDispatcher.dispatch({
      actionType: ActionTypes.IDE_TOGGLE_FULL_SCREEN,
      fullscreen: fullscreen
    });
  },

  loadCompleted: function() {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.IDE_LOADED
    });
  }
};

module.exports = IdeActions;
