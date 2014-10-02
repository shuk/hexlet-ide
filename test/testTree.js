/* global after require before define describe it */
var assert = require("assert");

describe("test tree", function(){
  this.timeout(100000);
  var helper = require("./testHelper");
  var b = helper.getBrowser;

  var tree = require("./pages/Tree")(b);
  var contextMenu = require("./pages/ContextMenu")(b);
  var modal = require("./pages/Modal")(b);

  var scenario = require("./Scenario")(b);

  it("open/close folder", function(done) {
    scenario().run(function() {
      tree.clickBy("folder1");
      assert(tree.isNodeOpened("folder1"));

      tree.clickBy("folder1");
      assert(tree.isNodeClosed("folder1"));
    }).end(done);
  });

  it("create/remove folder", function(done) {
    scenario().run(function() {
      tree.rightClickBy("folder1");
      contextMenu.newFolder();
      modal.fillFolderName("folder2");
      modal.apply();
    })
    .run(function() {
      assert(tree.hasNode("folder2"));
    }).run(function() {
      tree.rightClickBy("folder2");
      contextMenu.removeFolder();
      modal.apply();
    })
    .run(function() {
      assert(!tree.hasNode("folder2"));
    })
    .end(done);
  });

  it("create/remove file", function(done) {
    scenario().run(function() {
      tree.rightClickBy("folder1");
      contextMenu.newFile();
      modal.fillFileName("test_file.txt");
      modal.apply();
    })
    .run(function() {
      console.log(111111);
      assert(tree.hasNode("test_file.txt"));
      console.log(111111);
    }).run(function() {
      tree.rightClickBy("test_file.txt");
      contextMenu.removeFile();
      modal.apply();
    })
    .run(function() {
      assert(!tree.hasNode("test_file.txt"));
    })
    .end(done);
  });
});
