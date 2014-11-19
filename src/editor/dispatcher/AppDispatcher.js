/* global require module */

var Dispatcher = require("flux/lib/Dispatcher");
var objectAssign = require("react/lib/Object.assign");

var AppDispatcher = objectAssign(new Dispatcher(), {
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
