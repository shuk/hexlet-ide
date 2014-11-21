/* global require process module console */
var pty = require("pty.js");

var terminals = {};

function connectTerminal(socket, id) { "use strict";
  var terminal = terminals[id];
  terminal.on("data", function(data) {
    //FIXME: хак, пока нет дуплексной связи между сервером и клиентом
    socket.emit("terminalUpdated", { id: id, data: data });
  });
}

function createTerminal(socket, options, params) { "use strict";
  var id = params.id;
  var terminal = pty.fork(process.env.SHELL || "bash", [], {
    name: require("fs").existsSync("/usr/share/terminfo/x/xterm-256color")
      ? "xterm-256color"
      : "xterm",
      cols: params.cols,
      rows: params.rows,
      cwd: options.rootDir
  });

  terminals[id] = terminal;
  connectTerminal(socket, id);

  return terminal;
}

function closeTerminal(id) { "use strict;"
  var terminal = terminals[id];
  terminal.destroy();
  delete terminals[id];
}

module.exports = function(options) { "use strict";
  return {
    create: function(params) {
      var id = params.id;

      if (terminals[id]) {
        closeTerminal(id);
      }
      var terminal = createTerminal(this.clientSocket, options, params);
      console.log("Created shell with pty master/slave pair (master: %d, pid: %d)", terminal.fd, terminal.pid);
    },

    update: function(msg) {
      var terminal = terminals[msg.id];
      if (terminal) {
        terminal.write(msg.data);
      }
    },

    destroy: function(msg) {
      var id = msg.id;
      if (terminals[id]) {
        closeTerminal(id);
      }
      console.log("Destroy shell pty with (master: %d, pid: %d)", terminal.fd, terminal.pid);
    },

    reconnect: function(params) {
      var id = params.id;
      if (terminals[id]) {
        connectTerminal(this.clientSocket, id);
      }
    }
  };
};
