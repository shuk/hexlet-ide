/** @jsx React.DOM */

require("codemirror/lib/codemirror.css");

var _ = require("lodash");
var Immutable = require("immutable");
var CodeMirror = require("codemirror");
var React = require("react");
var ReactPropTypes = React.PropTypes;

var FSStore = require("stores/FSStore")

function getState() {
    return {tabsData: FSStore.getOpenedInTabs()}
}

var Box = React.createClass({
    propTypes: {
        // tabsData: React.PropTypes.renderable.isRequired
        // defaultCollapsed: React.PropTypes.bool,
    },

    getInitialState: function() {
        return getState();
    },

    render: function() {
        var data = this.state.tabsData;

        var tabs = data.map(function(item) {
            return <li><a href="#">{item.id}</a></li>
        });

        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    {tabs}
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
        FSStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        FSStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getState());
    }

});

module.exports = Box;
