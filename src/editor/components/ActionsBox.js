var React = require("react/addons");
var TreeActions = require("editor/actions/TreeActions");
var IdeActions = require("editor/actions/IdeActions");
var IdeStore = require("editor/stores/IdeStore");

var ActionsBox = React.createClass({

  render: function() {
    return (
      <div className="action-box">
        <div className="btn-group-vertical" role="group">
          <button onClick={this.toggleFullscreen} type="button" className="btn btn-default">
            <span className={this.getFullScreenButtonInnerClasses()} />
          </button>
          <button onClick={this.refreshFileTree} type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-refresh"/>
          </button>
        </div>
      </div>
    );
  },

  getFullScreenButtonInnerClasses: function() {
    var cx = React.addons.classSet;
    var glyphiconType = IdeStore.getState().fullscreen ?
      "glyphicon-resize-small" :
      "glyphicon-resize-full";
    var classes = {
      "glyphicon": true
    };
    classes[glyphiconType] = true;
    return cx(classes);
  },

  refreshFileTree: function() {
    TreeActions.loadTree();
  },

  toggleFullscreen: function() {
    IdeActions.toggleFullscreen();
  }
});

module.exports = ActionsBox;
