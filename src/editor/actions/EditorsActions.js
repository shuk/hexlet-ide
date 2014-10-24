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
      id: editor.id
    });
  },

  makeCurrent: function(editor) {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.EDITORS_MAKE_CURRENT,
      id: editor.id
    });
  },

  save: function(editor) {
    "use strict";
    var path = TreeStore.getPathById(editor.id);
    rpc.fs.write(path, editor.content).then(function() {
      AppDispatcher.dispatch({
        actionType: ActionTypes.EDITORS_SAVE_CURRENT,
        id: editor.id
      });
    });
  },

  edit: function(editor, content) {
    "use strict";
    AppDispatcher.dispatch({
      actionType: ActionTypes.EDITORS_EDIT_CURRENT,
      id: editor.id,
      content: content
    });
  }
};
