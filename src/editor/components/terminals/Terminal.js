/** @jsx React.DOM */

var React = require("react/addons");
var TerminalsActions = require('editor/actions/TerminalsActions');

var Terminal = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div ref="terminal" onClick={this.resize.bind(this)}></div>
        </div>
      </div>
    );
  },

  resize: function () {
    var terminal = this.props.terminal;
    // FIXME resize on size changed
    terminal.terminal.element.onresize=function(){terminal.terminal.fit(); console.log("resize")};
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
  }
});


module.exports = Terminal;
