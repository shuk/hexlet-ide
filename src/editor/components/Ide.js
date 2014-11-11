/** @jsx React.DOM */

var React = require("react/addons");

var Config = require("editor/config");
var TreeBox = require("editor/components/tree/TreeBox");
var EditorsBox = require("editor/components/editors/EditorsBox");
var TerminalsBox = require("editor/components/terminals/TerminalsBox");
var ContextMenu = require("editor/components/common/ContextMenu");
var Modal = require("editor/components/common/Modal");
var Loader = require("editor/components/common/Loader");
var RunnerBox = require("editor/components/RunnerBox");

var IdeActions = require("editor/actions/IdeActions");
var TreeActions = require("editor/actions/TreeActions");
var TerminalsActions = require("editor/actions/TerminalsActions");
var EditorsActions = require("editor/actions/EditorsActions");
var WatchStoreMixin = require("editor/mixins/WatchStore");
var IdeStore = require("editor/stores/IdeStore");
var EditorsStore = require("editor/stores/EditorsStore");

var Ide = React.createClass({
  mixins: [WatchStoreMixin(IdeStore)],
  getFluxState: function() {
    return IdeStore.getState();
  },

  componentWillMount: function() {
    console.log(this.props);
    this.domElement = this.props.domElement;
    this.rpc = require("editor/rpc");
    this.bindEvents();
    this.runAutosave();
  },

  bindEvents: function() {
    this.rpc.ready(function(proxy) {
      TreeActions.loadTree();
      TerminalsActions.createTerminal(Config.terminal);

      IdeActions.loadCompleted();
    });

    //FIXME: это хак, пока не сделано дуплексное RPC между клиентом и сервером
    this.rpc.socket.on("terminalUpdated", function(msg) {
      TerminalsActions.finishUpdateTerminal(msg);
    });
  },

  runAutosave: function() {
    this.autosaveTimer = setInterval(function() {
    console.log("123");
      var editors = EditorsStore.getAllDirty();
      editors.forEach(EditorsActions.save);
    }, Config.autosaveInterval);
  },

  runCommand: function(cmd) {
    TerminalsActions.runCommandInNewTerminal(cmd, Config.terminal);
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
        <div className="well well-mini" onClick={this.handleGlobalClick}>
          <div className="row">
            <div className="col-md-3 file-tree-box nopadding">
              <RunnerBox />
              <TreeBox />
            </div>
            <div className="col-md-9 nopadding">
              <div className="row">
                <div className="col-md-12">
                  <EditorsBox />
                </div>
                <div className="col-md-12">
                  <TerminalsBox />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Ide;
