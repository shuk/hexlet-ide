/* global require */

var program = {
  rootDir: "test/fixtures/project",
  port: 5000
};

require("./src/backend/server")(program);
