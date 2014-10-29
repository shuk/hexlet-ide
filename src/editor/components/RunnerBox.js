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
      <div className="runner-box">
        <div className="input-group">
          <input type="text" className="form-control" ref="commandTxt" />
          <div className="input-group-btn">
            <button onClick={this.handleRunCommandInNewTerminal} type="button" className="btn btn-default">Run</button>
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



