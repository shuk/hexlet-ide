/** @jsx React.DOM */

var _ = require("lodash");
// var Immutable = require("immutable");
var React = require("react/addons");
// var ReactPropTypes = React.PropTypes;

var TabsStore = require("editor/stores/TabsStore");
var Editor = require("editor/components/Editor");
var TabsActions = require("editor/actions/TabsActions");

function getState() {
    return {
        tabs: TabsStore.getAll(),
        current: TabsStore.getCurrent()
    }
}

var TabsBox = React.createClass({
    // propTypes: {
        // tabsData: React.PropTypes.renderable.isRequired
        // defaultCollapsed: React.PropTypes.bool,
    // },

    getInitialState: function() {
        return getState();
    },

    handleChangeEditorValue: function(value) {
        this.setState({value: value});
    },

    selectTab: function(tab, e) {
        TabsActions.makeCurrent(tab);
    },

    closeTab: function(tab, e) {
        TabsActions.closeTab(tab);
        TabsActions.flushTabContent(this.state.current.id, this.state.value);
    },

    render: function() {
        var tabs = this.state.tabs;
        var current = this.state.current;

        modes = {
            "js": "javascript",
            "jade": "jade"
        };

        if (current !== undefined) {
            mode = modes[_.last(current.name.split("."))];
        }

        var items = _.mapValues(tabs, function(tab) {
            var cx = React.addons.classSet;

            var tabClasses = cx({
                "active": tab.current,
            });

            return (<li key={"tab_" + tab.id} className={tabClasses}>
                <a href="#" onDoubleClick={this.closeTab.bind(this, tab)} onClick={this.selectTab.bind(this, tab)}>
                    {tab.name}
                </a>
            </li>);
        }, this);

        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    {items}
                </ul>
                <br />
                {current !== undefined ?
                    <Editor mode={mode} key={Math.random()} onChangeValue={this.handleChangeEditorValue} content={current.content} />
                : null}
            </div>
        );
    },

    componentDidMount: function() {
        TabsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TabsStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = TabsBox;
