var Section = require("./Section");

module.exports = function(getBrowser) {
  return Section.extend(getBrowser, ".file-tree-box", {

    wait: function(callback) {
      this.getBrowser().wait(function (window) {
        return window.document.querySelector(".tree-branch-name");
      }, callback);
    },

    rightClickBy: function(name) {
      this.contextmenu("[data-name='" + name + "'].tree-branch-name");
    },

    clickBy: function(name) {
      this.click("[data-name='" + name + "'].tree-branch-name");
    },

    hasNode: function(name) {
      return !!this.el().querySelector("[data-name='" + name + "']");
    },

    isNodeOpened: function(name) {
      return !!this.el().querySelector("button span[data-name='" + name + "'].glyphicon-folder-open");
    },

    isNodeClosed: function(name) {
      return !!this.el().querySelector("button span[data-name='" + name + "'].glyphicon-folder-close");
    }
  });
};
