/* global require process module before after */
var fs = require("fs-extra");

var fixturesDir = "./test/fixtures/project/";
var testDir = "/var/tmp/test_dir";

var helper = {};
helper.port = process.env.PORT || 9000;
helper.baseUrl = "http://localhost:" + helper.port;

var Nightmare = require("nightmare");
var debug = require("debug")("nightmare");

var customActions = require("./support/nightmareCustomActions");
Object.keys(customActions).forEach(function (name) {
  var fn = customActions[name];
  Nightmare.prototype[name] = function() {
    debug('queueing action "' + name + '"');
    var args = [].slice.call(arguments);
    this.queue.push([fn, args]);
    return this;
  };
});


before(function() {
  this.timeout(10000);

  if (process.env.NODE_ENV === "travis") {
    fs.copySync(fixturesDir, testDir);

    require("../src/backend/server")({
      port: helper.port,
      rootDir: testDir
    });
  }
});

after(function() {
  if (process.env.NODE_ENV === "travis") {
    fs.removeSync(testDir);
  }
});

module.exports = helper;
