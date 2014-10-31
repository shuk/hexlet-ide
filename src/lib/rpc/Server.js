var _ = require("lodash");
var when = require("when");

function registerServerMethod(socket, methodName, callback) { "use strict";
  socket.on(methodName, function(argsArray) {
    console.log("Call server method: ", methodName, " with args: ", argsArray);
    var clientInfo = { clientSocket: socket };
    var promise = when(callback.apply(clientInfo, argsArray));
    promise.then(function(result) {
      console.log("Respond to client: ", methodName, " with result: ", result);
      socket.emit(methodName + "Done", result);
    });
  });
}

function Server(io, rpcMethods) {
  io.on("connection", function(socket) {
    console.log("Connected new user ", socket.client.conn.transport.constructor.name);

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
}

module.exports = Server;
