var Section = require("./Section");

module.exports = function(getBrowser) {
  return Section.extend(getBrowser, ".modal-dialog", {
    fillFolderName: function(text) {
      this.getBrowser().fill("folderName", text);
    },

    fillFileName: function(text) {
      this.getBrowser().fill("folderName", text);
    },

    apply: function() {
      this.click("[data-name='Apply']");
    },

    cancel: function() {
      this.click("[data-name='Cancel']");
    }
  });
};
