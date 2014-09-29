var http = require("http");

var server = http.createServer(function(req, res) {
  console.log("get request: ", req);
  res.end("Hello world!");
});

server.listen(8881);
console.log("Server started, wait for incomming connections");
