/* global require module */

var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var IdeConstants = require("editor/constants/IdeConstants");
var ActionTypes = IdeConstants.ActionTypes;
var TreeStore = require("editor/stores/TreeStore");
var rpc = require("editor/rpc");

module.exports = {
  // flushTabContent: function(id, content) {
  //     "use strict";
  //     AppDispatcher.dispatch({
  //         actionType: ActionTypes.TABS_FLUSH_CONTENT,
  //         id: id,
  //         content: content
  //     });
  // },

  closeEditor: function(editor) {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.EDITORS_CLOSE,
      path: editor.path
    });
  },

  makeCurrent: function(editor) {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.EDITORS_MAKE_CURRENT,
      path: editor.path
    });
  },

  save: function(editor) {
    "use strict";
    rpc.fs.write(editor.path, editor.content).then(function() {
      AppDispatcher.dispatch({
        actionType: ActionTypes.EDITORS_SAVE_CURRENT,
        path: editor.path
      });
    });
  },

  edit: function(editor, content) {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.EDITORS_EDIT_CURRENT,
      path: editor.path,
      content: content
    });
  }
};
