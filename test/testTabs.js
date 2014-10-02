/* global after require beforeEach define describe it */

describe("test tabs", function(){
  this.timeout(100000);
  var helper = require("./testHelper");
  var b = helper.getBrowser;

  function waitTreeLoaded(window) {
    return window.document.querySelector(".tree-branch-name");
  }

  // it("open/close file", function(done) {
  //   b().wait(waitTreeLoaded, function() {
  //   }).done(done);
  // });

  // it("reopen file", function(done) {
  //   b().wait(waitTreeLoaded, function() {
  //   }).done(done);
  // });

  // it("save file", function(done) {
  //   b().wait(waitTreeLoaded, function() {
  //   }).done(done);
  // });
});
