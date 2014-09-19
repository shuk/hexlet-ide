/* global module location Eureca */

// var EurecaClient = require("eureca.io").EurecaClient;

var uri = "http://localhost";
if (location.origin) {
  uri = location.origin;
} else {
  uri = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
}

module.exports = new Eureca.Client({
  transport: "sockjs",
  uri: uri
});
