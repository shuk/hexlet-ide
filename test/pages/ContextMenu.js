var Section = require("./Section");

module.exports = function(getBrowser) {
  return Section.extend(getBrowser, ".context-menu", {

    newFolder: function() {
      return this.click("[data-name='New folder']");
    },

    newFile: function() {
      return this.click("[data-name='New file']");
    },

    removeFolder: function() {
      return this.click("[data-name='Remove folder']");
    },

    removeFile: function() {
      return this.click("[data-name='Remove file']");
    }

  });
};
