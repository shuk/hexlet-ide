/* global require module */

var keyMirror = require("react/lib/keyMirror");

module.exports = {
    ActionTypes: keyMirror({
        TREE_TOGGLE_FOLDER_STATE: null,
        TREE_OPEN_FILE: null,
        TABS_MAKE_CURRENT: null
    })
};
