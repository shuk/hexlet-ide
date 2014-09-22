/* global require process module console */

var term = require("term.js");
var pty = require("pty.js");

var terminals = {};

function createTerminal(socket, options, params) { "use strict";
  var terminal = pty.fork(process.env.SHELL || "sh", [], {
    name: require("fs").existsSync("/usr/share/terminfo/x/xterm-256color")
    ? "xterm-256color"
    : "xterm",
    cols: params.cols,
    rows: params.rows,
    cwd: options.rootDir
  });

  terminal.on("data", function(data) {
    socket.emit("terminalUpdated", { id: terminal.pid, data: data });
  });

  terminals[terminal.pid] = terminal;
  return terminal;
}

module.exports = function(io, app, options) {
  app.use(term.middleware());

  io.on("connection", function(socket) {
    socket.on("createTerminal", function(params) {
      var terminal = createTerminal(socket, options, params);
      console.log("Created shell with pty master/slave pair (master: %d, pid: %d)", terminal.fd, terminal.pid);
      socket.emit("terminalCreated", { id: terminal.pid, params: params });
    });

    socket.on("updateTerminal", function(msg) {
      var terminal = terminals[msg.id];
      terminal.write(msg.data);
    });

    socket.on("closeTerminal", function(msg) {
      var terminal = terminals[msg.id];
      terminal.destroy();
      delete terminals[msg.id];
      console.log("Destroy shell pty with (master: %d, pid: %d)", terminal.fd, terminal.pid);
    });
  });
};
