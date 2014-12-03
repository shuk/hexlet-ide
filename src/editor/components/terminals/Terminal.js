var React = require("react/addons");
var TerminalsActions = require('editor/actions/TerminalsActions');

var Terminal = React.createClass({
  render: function() {
    return (
      <div className="row max-height">
        <div className="col-xs-12 max-height">
          <iframe className="terminal-frame" name="terminalFrame"/>
          <div className="max-height" ref="terminal"></div>
        </div>
      </div>
    );
  },

  terminalResize: function () {
    var terminal = this.props.terminal;
    terminal.terminal.fit();
  },

  shouldComponentUpdate: function() {
    return false;
  },

  componentDidMount: function() {
    var terminal = this.props.terminal;

    terminal.terminal.on("data", function(data) {
      TerminalsActions.startUpdateTerminal({
        id: terminal.id,
        data: data
      });
    });

    terminal.terminal.open(this.refs.terminal.getDOMNode());
    this.terminalResize();

    terminalFrame.onresize = function(){
      this.terminalResize();
    }.bind(this);
  }
});


module.exports = Terminal;
