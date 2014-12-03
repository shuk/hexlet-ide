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

  render: function() {
    if (!this.state.loaded) {
      return <Loader />;
    }

    // FIXME Перейти на Flex
    return (
      <div className="ide-inner">
        <ContextMenu />
        <Modal />
        <div className="well well-sm max-height" onClick={this.handleGlobalClick}>
          <div className="max-height vertical-ide-split">
            <div className="left-ide-panel nopadding max-height">
              <div className="row">
                <div className="col-xs-10 file-tree-box">
                  <RunnerBox cmd={this.props.cmd}/>
                </div>
                <div className="col-xs-1 nopadding">
                  <ActionsBox />
                </div>
              </div>
              <TreeBox />
            </div>
            <div className="right-ide-panel nopadding max-height">
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
