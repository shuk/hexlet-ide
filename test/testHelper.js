/* global require process module __dirname before beforeEach afterEach setTimeout */
// process.env.NODE_ENV = "test";

var fs = require("fs-extra");

var fixturesDir = "./test/fixtures/project/";
var testDir = "/var/tmp/test_dir";

var helper = {
  port: process.env.PORT || 8080
};

before(function() {

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
