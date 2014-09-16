/* global require process module before after */
var fs = require("fs-extra");
var Browser = require("zombie");

var fixturesDir = "./test/fixtures/project/";
var testDir = "/var/tmp/test_dir";

var helper = {
  port: process.env.PORT || 8080,
  baseUrl: "http://localhost:" + process.env.PORT || 8080,
  getBrowser: function() { return helper.browser; }
};

before(function(done) {
  this.timeout(10000);

  if (process.env.NODE_ENV === "travis") {
    fs.copySync(fixturesDir, testDir);

    require("../src/backend/server")({
      port: helper.port,
      rootDir: testDir
    });
  }

  helper.browser = Browser.create({ debug: true, site: helper.baseUrl });
  helper.browser.visit("/", done);
});

after(function() {
  if (process.env.NODE_ENV === "travis") {
    fs.removeSync(testDir);
  }
});

module.exports = helper;
