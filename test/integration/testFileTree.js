/* global require describe it */
var Nightmare = require("nightmare");
var plugins = require("../plugins");

describe("test tree", function(){
  this.timeout(100000);
  it("open/close folder", function(done) {
    new Nightmare({ timeout: 8000 })
    .use(plugins.defaultSettings())
    .use(plugins.openTreeNode("folder1"))
    .use(plugins.closeTreeNode("folder1"))
    .run(done);
  });
});
