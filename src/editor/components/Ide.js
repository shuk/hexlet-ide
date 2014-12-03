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
    IdeActions.toggleFullscreen(this.state.fullscreen);
  },

  getIdeInnerClasses: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      "full-screen-ide": this.state.fullscreen,
      "embedded-ide": !this.state.fullscreen
    });
    return classes;
  },

  getFullscreenButtonTxt: function() {
    if (this.state.fullscreen) {
      return "Embedded";
    } else {
      return "Fullscreen";
    }
  },

  render: function() {
    if (!this.state.loaded) {
      return <Loader />;
    }

    // FIXME Перейти на Flex
    return (
      <div className={this.getIdeInnerClasses()}>
        <ContextMenu />
        <Modal />
        <button className="btn btn-xs full-screen-btn" onClick={this.toggleFullscreen}>
          {this.getFullscreenButtonTxt()}
        </button>
        <div className="well well-sm max-height" onClick={this.handleGlobalClick}>
          <div className="max-height row">
            <div className="col-xs-3 nopadding max-height">
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
            <div className="col-xs-9 nopadding max-height">
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
