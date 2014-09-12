/* global module */

module.exports = {
    treeOptions: {
        modelComparatorFn: function(a, b) {
            if (a.type === "folder" && b.type === "file") {
                return -1;
            } else if (b.type === "folder" && a.type === "file") {
                return 1;
            } else {
                // FIXME sort names
                return 0;
            }
        }
    }
};
