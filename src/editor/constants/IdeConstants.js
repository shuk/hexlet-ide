/* global require module */

var keyMirror = require("react/lib/keyMirror");

module.exports = {
  ActionTypes: keyMirror({
    IDE_GLOBAL_CLICK: null,

    TREE_LOAD: null,
    TREE_RELOAD: null,
    TREE_TOGGLE_FOLDER_STATE: null,
    TREE_OPEN_FILE: null,
    TREE_OPEN_CONTEXT_MENU: null,
    TREE_OPEN_CREATE_FOLDER_MODAL: null,
    TREE_OPEN_REMOVE_FOLDER_MODAL: null,
    TREE_OPEN_CREATE_FILE_MODAL: null,
    TREE_OPEN_REMOVE_FILE_MODAL: null,
    TREE_CREATE_FILE: null,
    TREE_REMOVE_FILE: null,
    TREE_CREATE_FOLDER: null,
    TREE_REMOVE_FOLDER: null,
    TREE_RENAME: null,

    MODAL_CLOSE: null,
    MODAL_OPEN: null,

    EDITORS_CLOSE: null,
    EDITORS_MAKE_CURRENT: null,
    EDITORS_SAVE_CURRENT: null,
    EDITORS_EDIT_CURRENT: null,
    // EDITORS_FLUSH_CONTENT: null

    TERMINALS_CREATE_TERMINAL: null,
    TERMINALS_UPDATE_TERMINAL: null,
    TERMINALS_SELECT_TERMINAL: null,
    TERMINALS_CLOSE_TERMINAL: null,

    CONTEXT_MENU_SHOW: null,
    CONTEXT_MENU_HIDE: null

  })
};
