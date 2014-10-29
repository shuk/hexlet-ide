var debug = require("debug")("nightmare");

module.exports = {
  doubleClick: function(selector, done) {
    debug(".doubleClick() on " + selector);
    this.page.evaluate(function(selector) {
      var element = document.querySelector(selector);
      var event = document.createEvent("MouseEvent");
      event.initEvent('dblclick', true, true);
      element.dispatchEvent(event);
    }, done, selector);
  },
  contextMenu: function(selector, done) {
    debug(".contextMenu() on " + selector);
    this.page.evaluate(function(selector) {
      var element = document.querySelector(selector);
      var event = document.createEvent("MouseEvent");
      event.initEvent('contextmenu', true, true);
      element.dispatchEvent(event);
    }, done, selector);
  }
};
