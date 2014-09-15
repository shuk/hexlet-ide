/* global require process module console */

var term = require("term.js");
var pty = require("pty.js");
var socketIo = require("socket.io");

var terminals = {};

function createTerminal(socket, options) { "use strict";
  var terminal = pty.fork(process.env.SHELL || "sh", [], {
    name: require("fs").existsSync("/usr/share/terminfo/x/xterm-256color")
    ? "xterm-256color"
    : "xterm",
    cols: 80,
    rows: 24,
    cwd: options.rootDir
  });

  terminal.on("data", function(data) {
    socket.emit("data", { id: terminal.pid, data: data });
  });

  console.log("Created shell with pty master/slave pair (master: %d, pid: %d)", terminal.fd, terminal.pid);
  terminals[terminal.pid] = terminal;
  return terminal.pid;
}

module.exports = function(server, app, options) {
  var io = socketIo(server);
  app.use(term.middleware());

  var socket;

  io.sockets.on("connection", function(sock) {
    socket = sock;

    socket.on("createTerminal", function() {
      var id = createTerminal(socket, options);
      socket.emit("terminalCreated", {id: id});
    });

    socket.on("closeTerminal", function(msg) {
      var terminal = terminals[msg.id];
      terminal.destroy();
      delete terminals[msg.id];
      console.log("Destroy shell pty with (master: %d, pid: %d)", terminal.fd, terminal.pid);
    });

    socket.on("data", function(msg) {
      var terminal = terminals[msg.id];
      terminal.write(msg.data);
    });

    socket.on("disconnect", function() {
      socket = null;
    });
  });
};
