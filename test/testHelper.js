/* global require process module __dirname before beforeEach afterEach setTimeout */
// process.env.NODE_ENV = "test";

var fs = require("fs-extra");

var fixturesDir = "./test/fixtures/project/";
var testDir = "/var/tmp/test_dir";

before(function() {
  fs.copySync(fixturesDir, testDir);

  require("../src/backend/server")({
    port: 3001,
    rootDir: testDir
  });
});


after(function() {
  fs.removeSync(testDir);
});
