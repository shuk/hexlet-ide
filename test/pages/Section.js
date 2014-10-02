/* global require module  */
var _ = require("lodash");

function Section(getBrowser, selector) {
  "use strict";
  this.getBrowser = getBrowser;
  this._selector = selector;
}


Section.prototype.el = function() {
  return this.getBrowser().querySelector(this._selector);
};

Section.prototype.click = function(selector) {
  this.getBrowser().fire(this.el().querySelector(selector), "click");
  return this;
};

Section.prototype.contextmenu = function(selector) {
  this.getBrowser().fire(this.el().querySelector(selector), "contextmenu");
  return this;
};

Section.extend = function(getBrowser, selector, body) {
  return _.extend(new Section(getBrowser, selector), body);
};

module.exports = Section;
