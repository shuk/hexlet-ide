/** @jsx React.DOM */

var React = require("react/addons");
var TerminalsActions = require("editor/actions/TerminalsActions");
var TerminalsStore = require("editor/stores/TerminalsStore");
var WatchStoreMixin = require("editor/mixins/WatchStore");
var Config = require("editor/config");

var RunnerBox = React.createClass({
  mixins: [ WatchStoreMixin(TerminalsStore) ],

  getFluxState: function() {
    return {
     currentTerminal: TerminalsStore.getCurrent()
    };
  },

  render: function() {
    return (
      <div className="btn-toolbar runner-box" role="toolbar">
        <div className="input-group">
          <input type="text" className="form-control" ref="commandTxt" />
          <div className="input-group-btn">
            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">Run <span className="caret"></span></button>
            <ul className="dropdown-menu dropdown-menu-right" role="menu">
              <li><button onClick={this.handleRunCommandInNewTerminal}>Run in new terminal</button></li>
              <li><button onClick={this.handleRunCommandInCurrentTerminal}>Run in current terminal</button></li>
            </ul>
          </div>
        </div>
      </div>
    );
  },

  handleRunCommandInNewTerminal: function() {
    var cmd = this.refs.commandTxt.getDOMNode().value;
    TerminalsActions.runCommandInNewTerminal(cmd, Config.terminal);
  },

  handleRunCommandInCurrentTerminal: function() {
    var cmd = this.refs.commandTxt.getDOMNode().value;
    if (this.state.currentTerminal) {
      TerminalsActions.runCommand(this.state.currentTerminal, cmd);
    } else {
      TerminalsActions.runCommandInNewTerminal(cmd, Config.terminal);
    }
  }
});

module.exports = RunnerBox;



