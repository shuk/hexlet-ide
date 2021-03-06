/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

module.exports = {
  showModal: function(options) {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.MODAL_OPEN,
      options: options
    });
  },
  close: function() {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.MODAL_CLOSE
    });
  }
};
