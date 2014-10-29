var testHelper = require("../testHelper");

module.exports = function() {
  return function(nightmare) {
    nightmare
    .viewport(1280, 1024)
    .goto(testHelper.baseUrl);
  };
};
