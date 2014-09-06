/** @jsx React.DOM */

var _ = require("lodash");
// var Immutable = require("immutable");
var React = require("react/addons");
// var ReactPropTypes = React.PropTypes;

var TabsActions = require("actions/TabsActions");

var Tab = React.createClass({
    // propTypes: {
    // tabsData: React.PropTypes.renderable.isRequired
    // defaultCollapsed: React.PropTypes.bool,
    // },

    selectTab: function(tab, e) {
        TabsActions.makeCurrent(this.props.tab);
    },

    closeTab: function(tab, e) {
        TabsActions.closeTab(this.props.tab);
    },


    render: function() {
        var tab = this.props.tab;
        var cx = React.addons.classSet;

        var tabClasses = cx({
            "active": tab.current,
        });

        return (
            <li className={tabClasses}>
                <a href="#" onDoubleClick={this.closeTab} onClick={this.selectTab}>
                    {tab.name}
                </a>
            </li>
        );
    }
});

module.exports = Tab;
