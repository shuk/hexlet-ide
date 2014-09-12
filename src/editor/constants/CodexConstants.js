/* global require module */

var keyMirror = require("react/lib/keyMirror");

module.exports = {
    ActionTypes: keyMirror({
        CODEX_GLOBAL_CLICK: null,

        TREE_LOAD: null,
        TREE_TOGGLE_FOLDER_STATE: null,
        TREE_OPEN_FILE: null,
        TREE_OPEN_CONTEXT_MENU: null,
        TREE_CLOSE_MODAL: null,
        TREE_OPEN_CREATE_FOLDER_MODAL: null,
        TREE_OPEN_REMOVE_FOLDER_MODAL: null,
        TREE_CREATE_FILE_MODAL: null,
        TREE_REMOVE_FILE_MODAL: null,
        TREE_CREATE_FILE: null,
        TREE_REMOVE_FILE: null,
        TREE_CREATE_FOLDER: null,
        TREE_REMOVE_FOLDER: null,

        TABS_MAKE_CURRENT: null,
        TABS_SAVE_CURRENT: null,
        TABS_EDIT_CURRENT: null
        // TABS_FLUSH_CONTENT: null
    })
};
