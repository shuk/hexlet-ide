var _ = require("lodash");
var when = require("when");

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
  socket.once("rpcMethods", function(methods) {
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

module.exports = Client;
