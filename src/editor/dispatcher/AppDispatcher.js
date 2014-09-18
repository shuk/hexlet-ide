/* global require module */

// var ChatConstants = require('../constants/ChatConstants');
var Dispatcher = require("flux/lib/Dispatcher");
var copyProperties = require("react/lib/copyProperties");

// var PayloadSources = ChatConstants.PayloadSources;

var AppDispatcher = copyProperties(new Dispatcher(), {

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the server.
   */
  // handleServerAction: function(action) {
  //   var payload = {
  //     source: PayloadSources.SERVER_ACTION,
  //     action: action
  //   };
  //   this.dispatch(payload);
  // },

  /**
   * @param {object} action The details of the action, including the action's
   * type and additional data coming from the view.
   */
  // handleViewAction: function(action) {
  //   var payload = {
  //     source: PayloadSources.VIEW_ACTION,
  //     action: action
  //   };
  //   this.dispatch(payload);
  // }
  //
  registerHandler: function(actionType, callback) {
    if (!actionType) {
      throw "ActionType is undefined!!!";
    }
    this.register(function(payload) {
      if (payload.actionType === actionType) {
        callback(payload);
      }
    });
  }

});

module.exports = AppDispatcher;
