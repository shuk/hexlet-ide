/** @jsx React.DOM */

var React = require("react/addons");

var TreeBox = require("editor/components/tree/TreeBox");
var EditorsBox = require("editor/components/editors/EditorsBox");
var TerminalsBox = require("editor/components/terminals/TerminalsBox");
var ContextMenu = require("editor/components/common/ContextMenu");
var Modal = require("editor/components/common/Modal");
var Loader = require("editor/components/common/Loader");
var RunnerBox = require("editor/components/RunnerBox");
var ActionsBox = require("editor/components/ActionsBox");

var IdeActions = require("editor/actions/IdeActions");
var WatchStoreMixin = require("editor/mixins/WatchStore");
var IdeStore = require("editor/stores/IdeStore");

var Ide = React.createClass({
  mixins: [WatchStoreMixin(IdeStore)],
  getFluxState: function() {
    return IdeStore.getState();
  },

  handleGlobalClick: function() {
    IdeActions.globalClick();
  },

  toggleFullscreen: function() {
    IdeActions.toggleFullscreen();
  },

  getIdeInnerClasses: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      "full-screen-ide": this.state.fullScreen
    });
    return classes;
  },

  render: function() {
    if (!this.state.isLoaded) {
      return <Loader />;
    }

    return (
      <div className={this.getIdeInnerClasses()}>
        <ContextMenu />
        <Modal />
        <button className="btn btn-xs full-screen-btn" onClick={this.toggleFullscreen}>
          Fullscreen
        </button>
        <div className="well well-mini max-height" onClick={this.handleGlobalClick}>
          <div className="row max-height">
            <div className="col-md-3 nopadding max-height">
              <div className="row">
                <div className="col-md-10 file-tree-box">
                  <RunnerBox cmd={this.props.cmd}/>
                </div>
                <div className="col-md-1 nopadding">
                  <ActionsBox />
                </div>
              </div>
              <TreeBox />
            </div>
            <div className="col-md-9 nopadding max-height">
              <EditorsBox />
              <TerminalsBox />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Ide;
