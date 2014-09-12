/** @jsx React.DOM */

var _ = require("lodash");
// var Immutable = require("immutable");
var React = require("react/addons");
// var ReactPropTypes = React.PropTypes;
var key = require("keymaster");

var TabsStore = require("editor/stores/TabsStore");
var Editor = require("editor/components/Editor");
var TabsActions = require("editor/actions/TabsActions");
var Modal = require("editor/components/Modal");
var ModalStore = require("editor/stores/ModalStore");

function getState() {
    return {
        tabs: TabsStore.getAll(),
        modalData: ModalStore.get("tabs"),
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

    handleForceCloseTab: function() {
        TabsActions.closeTab(this.state.current);
    },

    handleCloseTab: function(e) {
        var current = this.state.current;
        if (this.state.current.dirty) {
            TabsActions.openSavingModalForDirtyTab(current);
        } else {
            TabsActions.closeTab(current);
        }
        // TabsActions.flushTabContent(this.state.current.id, this.state.value);
    },

    render: function() {
        var cx = React.addons.classSet;

        var tabs = this.state.tabs;
        var current = this.state.current;

        var modalData = this.state.modalData;

        modes = {
            "js": "javascript",
            "jade": "jade"
        };

        if (current !== undefined) {
            mode = modes[_.last(current.name.split("."))];
        }

        var items = tabs.map(function(tab) {
            var tabClasses = cx({
                "active": tab.current,
            });

            return (<li key={"tab_" + tab.id} className={tabClasses}>
                <a href="#" onDoubleClick={this.handleCloseTab.bind(this, tab)} onClick={this.selectTab.bind(this, tab)}>
                    {tab.name}
                    {tab.dirty ? "*" : null}
                </a>
            </li>);
        }, this);

        return (
            <div>
                {modalData ?
                    <Modal title={"Close unsaved tab"} onApply={this.handleForceCloseTab}>
                        {"are you sure? (unsaved data will be lost)"}
                    </Modal>
                : null}

                <ul className="nav nav-tabs" role="tablist">
                    {items}
                </ul>
                <div className="tab-content">
                    {tabs.map(function(tab) {
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
        TabsStore.addChangeListener(this._onChange);
        ModalStore.addChangeListener(this._onChange);
    },

    componentWillUpdate: function(nextProps, nextState) {
        var $this = this;

        if (nextState.current === undefined) {
            key.unbind("ctrl+s");
        } else {
            key("ctrl+s", function(){ $this.handleSaveFile(); return false });
        }
    },

    componentWillUnmount: function() {
        TabsStore.removeChangeListener(this._onChange);
        ModalStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = TabsBox;
