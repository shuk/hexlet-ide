/* global after require before define describe it */

describe("test tree", function(){
  this.timeout(10000);
  var helper = require("./testHelper");
  var b = helper.getBrowser;

  function waitTreeLoaded(window) {
    return window.document.querySelector(".tree-branch-name");
  }

  it("open/close folder", function(done) {
    b().wait(waitTreeLoaded, function() {
      b().fire("[data-name='folder1'].tree-branch-name", "click");
      b().assert.element("button span[data-name='folder1'].glyphicon-folder-open");

      b().fire("[data-name='folder1'].tree-branch-name", "click");
      b().assert.element("button span[data-name='folder1'].glyphicon-folder-close");
      done();
    }); //.done(done);
  });

  it("create/remove folder", function(done) {
    b().wait(waitTreeLoaded, function() {
      // b().fire("[data-name='project'].tree-branch-name", "contextmenu");
      // b().fire(".dropdown-menu a[data-name='New folder']", "click");
      // b().fill("folderName", "folder2");
      // b().pressButton("Apply");
      // b().assert.element("[data-name='folder2'].tree-label");
      // create
      // remove
    }).done(done);
  });

  it("create/remove file", function(done) {
    b().wait(waitTreeLoaded, function() {
      // create
      // remove
    }).done(done);
  });
});
