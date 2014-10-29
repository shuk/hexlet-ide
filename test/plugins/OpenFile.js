module.exports = function(fileName) {
  return function(nightmare) {
    nightmare
    .doubleClick("[data-name='" + fileName + "'].tree-branch-name")
    .wait();
  };
};
