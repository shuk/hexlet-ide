/* global require process module console */
var pty = require("pty.js");

var terminals = {};

function createTerminal(socket, options, params) { "use strict";

  var terminal = pty.fork(process.env.SHELL || "bash", [], {
    name: require("fs").existsSync("/usr/share/terminfo/x/xterm-256color")
    ? "xterm-256color"
    : "xterm",
    cols: params.cols,
    rows: params.rows,
    cwd: options.rootDir
  });

  terminal.on("data", function(data) {
    //FIXME: хак, пока нет дуплексной связи между сервером и клиентом
    socket.emit("terminalUpdated", { id: terminal.pid, data: data });
  });

  terminals[terminal.pid] = terminal;
  return terminal;
}

module.exports = function(options) {
  return {
    create: function(params) {
      var terminal = createTerminal(this.clientSocket, options, params);
      console.log("Created shell with pty master/slave pair (master: %d, pid: %d)", terminal.fd, terminal.pid);
      return { id: terminal.pid, params: params };
    },

    update: function(msg) {
      var terminal = terminals[msg.id];
      if (terminal) {
        terminal.write(msg.data);
      }
    },

    destroy: function(msg) {
      var terminal = terminals[msg.id];
      if (terminal) {
        terminal.destroy();
        delete terminals[msg.id];
        console.log("Destroy shell pty with (master: %d, pid: %d)", terminal.fd, terminal.pid);
      }
    }
  };
};
