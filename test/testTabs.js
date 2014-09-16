/* global after require beforeEach define describe it */

var Browser = require("zombie");
// var assert = require("assert");
var b = Browser.create({debug: false, site: "http://localhost:8080"});
var p = b.visit("/");

describe("test tabs", function(){
  this.timeout(100000);

  it("open/close file", function(done) {
    p.then(function() {
    })
    .done(done);
  });

  it("reopen file", function(done) {
    p.then(function() {
    })
    .done(done);
  });

  it("save file", function(done) {
    p.then(function() {
    })
    .done(done);
  });
});
