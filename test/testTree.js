/* global after require beforeEach define describe it */

var Browser = require("zombie");
// var assert = require("assert");

describe("test tree", function(){
    this.timeout(100000);

    var b;
    var p;

    beforeEach(function() {
        b = Browser.create({debug: false, site: "http://localhost:8080"});
        p = b.visit("/");
    });

    it("open/close folder", function(done) {
        p.then(function() {
            b.wait(function() {
                b.fire(".tree-branch-name", "click");
            });
        })
        .then(function() {
            b.wait(function() {
                b.assert.elements("button span.glyphicon-folder-close");
                done();
            });
        });
    });
});
