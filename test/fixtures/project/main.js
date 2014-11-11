var http = require("http");

var server = http.createServer(function(req, res) {
  console.log("get request: ", req);
  res.end("Hello world!");
});

console.log(123);

server.listenfdsf(8881);
console.log("Server started, wait for incomming connections");sdfsdf