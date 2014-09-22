/* global require module  */
var _ = require("lodash");
var when = require("when");

function registerServerMethod(socket, methodName, callback) { "use strict";
  socket.on(methodName, function(argsArray) {
    var promise = when(callback.apply(this, argsArray));
    promise.then(function(result) {
      socket.emit(methodName + "Done", result);
    });
  });
}

function generateClientMethod(client, methodName) {
  client[methodName] = function() {
    var args = Array.prototype.slice.call(arguments);

    return when.promise(function(resolve) {
      client.socket.once(methodName + "Done", function() {
        resolve.apply(null, arguments);
      });

      client.socket.emit(methodName, args);
    });
  };
}

function Client(socket) {
  this.socket = socket;
  socket.on("rpcMethods", function(methods) {
    this.methods = methods;

    methods.forEach(function(method) {
      generateClientMethod(this, method);
    }, this);

    this.onReady();
  }.bind(this));
}

Client.prototype.ready = function(callback) {
  this.onReady = callback;
};

module.exports = {
  createServer: function(io, rpcMethods) {
    io.on("connection", function(socket) {
      _.each(rpcMethods, function(method, methodName) {
        registerServerMethod(socket, methodName, method);
      });

      io.emit("rpcMethods", Object.keys(rpcMethods));
    });
  },

  createClient: function(socket) {
    return new Client(socket);
  }
};
