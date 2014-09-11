/** @jsx React.DOM */

var React = require("react/addons");
var CodeMirror = require("codemirror");

var TabsActions = require("editor/actions/TabsActions");

var Codex = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div ref="editor"></div>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        var element = this.refs.editor;
        var myCodeMirror = CodeMirror(element.getDOMNode(), {
            lineNumbers: true,
            // tabSize: 2,
            value: this.props.content,
            mode: this.props.mode
        });

        myCodeMirror.on("change", function(CodeMirror, object) {
            this.onChangeValue(CodeMirror.getValue());
        });

        this.setState({myCodeMirror: myCodeMirror});
    }
});

module.exports = Codex;
