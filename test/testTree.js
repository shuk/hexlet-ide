/* global after require beforeEach define describe it */

var Browser = require("zombie");
// var assert = require("assert");
var b = Browser.create({debug: false, site: "http://localhost:8080"});
var p = b.visit("/");

describe("test tree", function(){
  this.timeout(100000);

  // beforeEach(function() {
  // });

  it("open/close folder", function(done) {
    p.then(function() {
      b.fire("[data-name='folder1'].tree-branch-name", "click");
      b.assert.element("button span[data-name='folder1'].glyphicon-folder-open");

      b.fire("[data-name='folder1'].tree-branch-name", "click");
      b.assert.element("button span[data-name='folder1'].glyphicon-folder-close");
    })
    .done(done);
  });

  it("create/remove folder", function(done) {
    p.then(function() {
      // b.fire("[data-name='project'].tree-branch-name", "contextmenu");
      // b.fire("[data-name='new folder']", "click");
      // b.fill("folderName", "folder2");
      // b.pressButton("Apply");
      // b.assert.element("[data-name='folder2'].tree-label");
      // create
      // remove
    })
    .done(done);
  });

  it("create/remove file", function(done) {
    p.then(function() {
      // create
      // remove
    }).done(done);
  });
});
