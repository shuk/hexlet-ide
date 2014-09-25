/** @jsx React.DOM */

var React = require("react/addons");

var TreeBox = require("editor/components/tree/TreeBox");
var EditorsBox = require("editor/components/editors/EditorsBox");
var TerminalsBox = require("editor/components/terminals/TerminalsBox");
var ContextMenu = require("editor/components/common/ContextMenu");
var Modal = require("editor/components/common/Modal");
var Loader = require("editor/components/common/Loader");
var RunnerBox = require("editor/components/RunnerBox");

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

  render: function() {
    if (!this.state.isLoaded) {
      return <Loader />;
    }

    return (
      <div>
        <ContextMenu />
        <Modal />
        <div className="row" onClick={this.handleGlobalClick}>
          <div className="col-md-3 file-tree-box">
            <RunnerBox />
            <TreeBox />
          </div>
          <div className="col-md-9 tabs-box">
            <EditorsBox />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 terminals-box">
            <TerminalsBox />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Ide;
