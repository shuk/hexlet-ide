/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var ActionTypes = IdeConstants.ActionTypes;

var ModalActions = {
  close: function() {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.MODAL_CLOSE
    });
  }
};

module.exports = ModalActions;
