/** @jsx React.DOM */

var _ = require("lodash");
// var Immutable = require("immutable");
var React = require("react/addons");
// var ReactPropTypes = React.PropTypes;
var key = require("keymaster");

var WatchStoreMixin = require("editor/mixins/WatchStore");

var Editor = require("editor/components/Editor");
var TabsStore = require("editor/stores/TabsStore");
var TabsActions = require("editor/actions/TabsActions");
var ModalActions = require("editor/actions/ModalActions");

var TabsBox = React.createClass({
  // propTypes: {
  // tabsData: React.PropTypes.renderable.isRequired
  // defaultCollapsed: React.PropTypes.bool,
  // },
  mixins: [ WatchStoreMixin(TabsStore) ],

  getFluxState: function() {
    return {
      tabs: TabsStore.getAll(),
      current: TabsStore.getCurrent()
    }
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

  handleCloseTab: function(e) {
    var current = this.state.current;
    if (this.state.current.dirty) {
      ModalActions.showModal({
        title: "Close unsaved tab",
        onApply: function() {
          TabsActions.closeTab(current);
        },
        content: function() {
          return <p>are you sure? (unsaved data will be lost)</p>;
        }
      });
    } else {
      TabsActions.closeTab(current);
    }
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

    var items = tabs.map(function(tab) {
      var tabClasses = cx({
        "active": tab.current,
      });

      return (<li key={"tab_" + tab.id} className={tabClasses}>
        <a href="#">
          <span onDoubleClick={this.handleCloseTab.bind(this, tab)} onClick={this.selectTab.bind(this, tab)}>
            {tab.name}
            {tab.dirty ? "*" : ""}
          </span>
          <span className="glyphicon glyphicon-remove" onClick={this.handleCloseTab.bind(this, tab)}></span>
        </a>
      </li>);
    }, this);

    return (
      <div>
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
                <div className={classes} key={tab.id}>
                  <Editor mode={mode}
                    focus={tab.current}
                    onChangeValue={this.handleChangeEditorValue.bind(this, tab)}
                    initContent={tab.content} />
                </div>
                );
            }, this)}
          </div>
        </div>
    );
  },

  componentWillUpdate: function(nextProps, nextState) {
    var $this = this;

    if (nextState.current === undefined) {
      key.unbind("ctrl+s");
    } else {
      key("ctrl+s", function(){ $this.handleSaveFile(); return false });
    }
  }
});

module.exports = TabsBox;
