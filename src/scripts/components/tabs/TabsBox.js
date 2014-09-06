/** @jsx React.DOM */

var _ = require("lodash");
// var Immutable = require("immutable");
var React = require("react/addons");
// var ReactPropTypes = React.PropTypes;

var Tab = require("./Tab");
var TabsStore = require("stores/TabsStore");
var Editor = require("components/Editor");

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

    render: function() {
        var tabs = this.state.tabs;
        var current = this.state.current;

        var items = _.mapValues(tabs, function(tab) {
            return <Tab tab={tab} />
        }, this);

        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    {items}
                </ul>
                <br />
                {current !== undefined ?
                    <Editor key={current.id} content={current.content} />
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
