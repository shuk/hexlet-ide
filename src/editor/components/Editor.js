/** @jsx React.DOM */

var React = require("react/addons");
var CodeMirror = require("codemirror");

var TabsActions = require("editor/actions/TabsActions");

var Editor = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div ref="editor"></div>
                    <div ref="terminal" id="terminal"></div>
                </div>
            </div>
        );
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.focus) {
            this.state.myCodeMirror.focus();
        }
    },

    componentDidMount: function() {
        var $this = this;
        var element = this.refs.editor;
        var myCodeMirror = CodeMirror(element.getDOMNode(), {
            lineNumbers: true,
            // tabSize: 2,
            value: this.props.initContent,
            mode: this.props.mode
        });

        myCodeMirror.on("change", function(CodeMirror, object) {
            $this.props.onChangeValue(myCodeMirror.getValue());
        });

        this.setState({myCodeMirror: myCodeMirror});
    }
});

module.exports = Editor;
