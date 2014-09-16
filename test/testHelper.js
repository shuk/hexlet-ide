/* global require process module before after */
var fs = require("fs-extra");
var Browser = require("zombie");

var fixturesDir = "./test/fixtures/project/";
var testDir = "/var/tmp/test_dir";

var helper = {};
helper.port = process.env.PORT || 8080;
helper.baseUrl = "http://localhost:" + helper.port;
helper.browser = Browser.create({ debug: true, site: helper.baseUrl });
helper.getBrowser = function() { return helper.browser; };

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
