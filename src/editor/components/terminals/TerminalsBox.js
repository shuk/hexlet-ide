/** @jsx React.DOM */

var _ = require("lodash");
var React = require("react/addons");
var TerminalsActions = require("editor/actions/TerminalsActions");
var TerminalsStore = require("editor/stores/TerminalsStore");

var Terminal = require("./Terminal");

function getState() {
  return {
    terminals: TerminalsStore.getAll()
  };
}

var TerminalsBox = React.createClass({
  getInitialState: function() {
    return getState();
  },

  renderTabHeaders: function() {
    return _.map(this.state.terminals, function(terminal) {
      var tabClasses = React.addons.classSet({
        "active": terminal.current
      });

      return <li key={"tab_" + terminal.id} className={tabClasses}>
        <a href="#">
          <span  onClick={this.selectTerminal.bind(this, terminal)}>{"terminal_" + terminal.id}</span>
          <span className="glyphicon glyphicon-remove" onClick={this.closeTerminal.bind(this, terminal)}></span>
        </a>
      </li>;
    }, this);
  },

  renderTerminals: function() {
    return _.map(this.state.terminals, function(terminal) {
      var classes = React.addons.classSet({
        "tab-pane": true,
        "fade active in": terminal.current
      });

      return (
        <div className={classes} key={terminal.id}>
          <Terminal terminal={terminal} />
        </div>
      );
    });
  },

  render: function() {
    return (
      <div>
        <ul className="nav nav-tabs" role="tablist">
          {this.renderTabHeaders()}
          <li key="tab_create">
            <a href="#" onClick={this.createTerminal}>Create terminal</a>
          </li>
        </ul>
        <div className="tab-content">
          {this.renderTerminals()}
        </div>
      </div>
    );
  },

  selectTerminal: function(terminal) {
    TerminalsActions.selectTerminal(terminal);
  },

  createTerminal: function() {
    TerminalsActions.startCreateTerminal();
  },

  closeTerminal: function(terminal) {
    TerminalsActions.closeTerminal(terminal);
  },

  componentDidMount: function() {
    TerminalsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TerminalsStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getState());
  }
});

module.exports = TerminalsBox;
