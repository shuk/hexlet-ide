var term = require("term.js");
var pty = require('pty.js');
var socketIo = require("socket.io");

module.exports = function(server, app, options) {
  var io = socketIo(server);

  app.use(term.middleware());

  var buff = [];
  var socket;

  var terminal = pty.fork(process.env.SHELL || 'sh', [], {
    name: require('fs').existsSync('/usr/share/terminfo/x/xterm-256color')
    ? 'xterm-256color'
    : 'xterm',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME
  });

  terminal.on('data', function(data) {
    return !socket
    ? buff.push(data)
    : socket.emit('data', data);
  });

  console.log(''
    + 'Created shell with pty master/slave'
    + ' pair (master: %d, pid: %d)',
  terminal.fd, terminal.pid);

  io.sockets.on('connection', function(sock) {
    socket = sock;

    socket.on('data', function(data) {
      //console.log(JSON.stringify(data));
      terminal.write(data);
    });

    socket.on('disconnect', function() {
      socket = null;
    });

    while (buff.length) {
      socket.emit('data', buff.shift());
    }
  });
}

