/* global require process module __dirname before beforeEach afterEach setTimeout */

var fs = require("fs-extra");

var fixturesDir = "./test/fixtures";
var testDir = "/var/tmp/test_dir";

before(function() {
  fs.copySync(fixturesDir, testDir);

  require("../src/backend/server")({
    port: 8080,
    rootDir: testDir
  });
});

beforeEach(function() {
  fs.copySync(fixturesDir, testDir);
});

afterEach(function() {
  fs.removeSync(testDir);
});
