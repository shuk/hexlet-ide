/** @jsx React.DOM */

var _ = require("lodash");
// var Immutable = require("immutable");
var React = require("react/addons");
// var ReactPropTypes = React.PropTypes;
var key = require("keymaster");

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

    handleChangeEditorValue: function(current, content) {
        TabsActions.edit(current, content);
    },

    handleSaveFile: function() {
        TabsActions.save(this.state.current);
    },

    selectTab: function(tab, e) {
        TabsActions.makeCurrent(tab);
    },

    closeTab: function(tab, e) {
        TabsActions.closeTab(tab);
        // TabsActions.flushTabContent(this.state.current.id, this.state.value);
    },

    render: function() {
        var cx = React.addons.classSet;

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
            var tabClasses = cx({
                "active": tab.current,
            });

            return (<li key={"tab_" + tab.id} className={tabClasses}>
                <a href="#" onDoubleClick={this.closeTab.bind(this, tab)} onClick={this.selectTab.bind(this, tab)}>
                    {tab.name}
                    {tab.edited ? "*" : null}
                </a>
            </li>);
        }, this);

        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    {items}
                </ul>
                <div className="tab-content">
                    {_.mapValues(tabs, function(tab) {
                        var classes = cx({
                            "tab-pane": true,
                            "fade active in": tab.current
                        });

                        return (
                            <div className={classes}>
                                <Editor mode={mode}
                                    focus={tab.current}
                                    key={tab.id}
                                    onChangeValue={this.handleChangeEditorValue.bind(this, tab)}
                                    initContent={tab.content} />
                            </div>
                        );
                    }, this)}
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        var $this = this;
        TabsStore.addChangeListener(this._onChange);

        key("ctrl+s", function(){ $this.handleSaveFile(); return false });
    },

    componentWillUpdate: function(nextProps, nextState) {
        if (nextState.current === undefined) {
            key.unbind("ctrl+s");
        }
    },

    componentWillUnmount: function() {
        TabsStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = TabsBox;
