/** @jsx React.DOM */

var React = require("react/addons");
var CodeMirror = require("codemirror");

var TabsActions = require("actions/TabsActions");

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
            value: this.props.content
            // mode: "javascript"
        });

        this.setState({myCodeMirror: myCodeMirror});
    },

    componentWillUnmount: function() {
        TabsActions.flushTabContent(this.props.key, this.state.myCodeMirror.getValue());
    }
});

module.exports = Codex;
