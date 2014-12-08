/* global require module */
var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var BaseStore = require("./BaseStore");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var state = {
  loaded: false,
  fullscreen: false,
  connected: false
};

var IdeStore = BaseStore.extend({
  getState: function() {
    "use strict";
    return state;
  }
});

AppDispatcher.registerHandler(ActionTypes.IDE_LOADED, function() {
  "use strict";

  state.loaded = true;
  IdeStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.IDE_TOGGLE_FULL_SCREEN, function(payload) {
  "use strict";

  state.fullscreen = payload.fullscreen;
  IdeStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.IDE_DISCONNECTED, function() {
  "use strict";

  state.connected = false;
});

AppDispatcher.registerHandler(ActionTypes.IDE_CONNECTED, function() {
  "use strict";

  state.connected = true;
});

module.exports = IdeStore;
