/* global after require beforeEach define describe it */

require("./testHelper");

var Browser = require("zombie");
// var assert = require("assert");
var b = Browser.create({debug: false, site: "http://localhost:8080"});

describe("test tree", function(){
  this.timeout(10000);
  var p;
  beforeEach(function() {
    p = b.visit("/");
  });

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
