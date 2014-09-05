/** @jsx React.DOM */

require("codemirror/lib/codemirror.css");

var _ = require("lodash");
// var Immutable = require("immutable");
var CodeMirror = require("codemirror");
var React = require("react/addons");
// var ReactPropTypes = React.PropTypes;

var TabsStore = require("stores/TabsStore")

function getState() {
    return {tabs: TabsStore.getAll()}
}

var TabsBox = React.createClass({
    // propTypes: {
        // tabsData: React.PropTypes.renderable.isRequired
        // defaultCollapsed: React.PropTypes.bool,
    // },

    getInitialState: function() {
        return getState();
    },

    render: function() {
        var tabs = this.state.tabs;

        var items = tabs.map(function(item) {
            return <li className="active"><a href="#">{item.name}</a></li>
        });

        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    {items}
                </ul>
                <div className="row">
                    <div className="col-md-12">
                        <div ref="editor" className="editor"></div>
                    </div>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        // var element = this.refs.editor;
        // var myCodeMirror = CodeMirror(element.getDOMNode(), {
        //     lineNumbers: true,
        //     tabSize: 2
        // });
        TabsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        // TabsStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = TabsBox;
