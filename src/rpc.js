/* global require module  */
var _ = require("lodash");
var when = require("when");

function registerServerMethod(socket, methodName, callback) { "use strict";
  socket.on(methodName, function(argsArray) {
    var clientInfo = { clientSocket: socket };
    var promise = when(callback.apply(clientInfo, argsArray));
    promise.then(function(result) {
      socket.emit(methodName + "Done", result);
    });
  });
}

function generateClientMethod(client, methodName) {
  var methodInfo = methodName.split(".");
  var namespace = methodInfo[0];
  var name = methodInfo[1];

  if (!client[namespace]) {
    client[namespace] = {};
  }

  client[namespace][name] = function() {
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

      var methodNames = [];
      _.each(rpcMethods, function(methods, namespace) {
        _.each(methods, function(method, methodName) {
          var name = namespace + "." + methodName;
          registerServerMethod(socket, name, method);
          methodNames.push(name);
        });
      });

      io.emit("rpcMethods", methodNames);
    });
  },

  createClient: function(socket) {
    return new Client(socket);
  }
};
