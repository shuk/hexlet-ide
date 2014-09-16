/* global after require before define describe it */

var h = require("./testHelper");

var Browser = require("zombie");
// var assert = require("assert");
var b = Browser.create({ debug: true, site: "http://localhost:" + h.port });

describe("test tree", function(){
  this.timeout(10000);
  var p;

  function waitTreeLoaded(window) {
    return window.document.querySelector(".tree-branch-name");
  }

  before(function(done) {
    p = b.visit("/", done);
  });

  it("open/close folder", function(done) {
    b.wait(waitTreeLoaded, function() {
      b.fire("[data-name='folder1'].tree-branch-name", "click");
      b.assert.element("button span[data-name='folder1'].glyphicon-folder-open");

      b.fire("[data-name='folder1'].tree-branch-name", "click");
      b.assert.element("button span[data-name='folder1'].glyphicon-folder-close");
    }).done(done);
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
