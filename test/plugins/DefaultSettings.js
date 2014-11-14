var testHelper = require("../testHelper");

module.exports = function() {
  return function(nightmare) {
    nightmare
      .on("consoleMessage", function(msg, line, sourceId) {
        console.log("CONSOLE:", msg);
      })
      .viewport(1280, 1024)
      .goto(testHelper.baseUrl);
  };
};
