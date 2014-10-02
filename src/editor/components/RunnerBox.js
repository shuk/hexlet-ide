/** @jsx React.DOM */

var React = require("react/addons");
var TerminalsActions = require("editor/actions/TerminalsActions");
var TerminalsStore = require("editor/stores/TerminalsStore");
var WatchStoreMixin = require("editor/mixins/WatchStore");

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
              <li><a href="#" onClick={this.handleRunCommandInNewTerminal}>Run in new terminal</a></li>
              <li><a href="#" onClick={this.handleRunCommandInCurrentTerminal}>Run in current terminal</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  },

  handleRunCommandInNewTerminal: function() {
    var cmd = this.refs.commandTxt.getDOMNode().value;
    TerminalsActions.runCommandInNewTerminal(cmd, {
      cols: 160,
      rows: 24
    });
  },

  handleRunCommandInCurrentTerminal: function() {
    var cmd = this.refs.commandTxt.getDOMNode().value;
    if (this.state.currentTerminal) {
      TerminalsActions.runCommand(this.state.currentTerminal, cmd);
    } else {
      TerminalsActions.runCommandInNewTerminal(cmd, {
        cols: 160,
        rows: 24
      });
    }
  }
});

module.exports = RunnerBox;



