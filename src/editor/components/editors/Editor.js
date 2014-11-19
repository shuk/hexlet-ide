/** @jsx React.DOM */

var React = require("react/addons");
var CodeMirror = require("codemirror");

var Editor = React.createClass({
  render: function() {
    return (
      <div className="row max-height">
        <div className="col-md-12 max-height">
          <div className="max-height" ref="editor"></div>
        </div>
      </div>
    );
  },

  componentWillReceiveProps: function(nextProps) {
    // if (nextProps.focus) {
    //   this.state.myCodeMirror.focus();
    // }
  },

  componentDidMount: function() {
    var $this = this;
    var element = this.refs.editor;
    var myCodeMirror = CodeMirror(element.getDOMNode(), {
      lineNumbers: true,
      tabSize: 2,
      extraKeys: {
        Tab: function(cm) {
          var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection(spaces);
        },
        "Shift-Tab": "autocomplete"
      },
      value: this.props.initContent,
      mode: this.props.mode,
      theme: "solarized dark",
      indentWithTabs: false
    });

    console.log(CodeMirror.mimeModes);

    myCodeMirror.on("change", function(CodeMirror, object) {
      $this.props.onChangeValue(myCodeMirror.getValue());
    });

    this.setState({myCodeMirror: myCodeMirror});
  }
});

module.exports = Editor;
