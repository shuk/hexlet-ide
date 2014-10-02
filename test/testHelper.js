/* global require process module before after */
var fs = require("fs-extra");
var Browser = require("zombie");

var fixturesDir = "./test/fixtures/project/";
var testDir = "/var/tmp/test_dir";

var helper = {};
helper.port = process.env.PORT || 8080;
helper.baseUrl = "http://localhost:" + helper.port;
helper.browser = Browser.create({ debug: false, site: helper.baseUrl, waitFor: 3000 });
helper.getBrowser = function() { return helper.browser; };

//NOTE: this is stub for React.js
helper.browser.on("opened", function(window) {
  window.getSelection = function() {
    return {
      rangeCount: 0
    };
  };
});


before(function(done) {
  this.timeout(10000);

  if (process.env.NODE_ENV === "travis") {
    fs.copySync(fixturesDir, testDir);

    require("../src/backend/server")({
      port: helper.port,
      rootDir: testDir
    });
  }

  helper.browser.visit("/", done);
});

after(function() {
  if (process.env.NODE_ENV === "travis") {
    fs.removeSync(testDir);
  }
});

module.exports = helper;
