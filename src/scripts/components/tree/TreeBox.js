/** @jsx React.DOM */

var _ = require("lodash");
var Immutable = require("immutable");
var React = require("react");

var Tree = require("./Tree");
var TreeStore = require("stores/TreeStore");

function getState() {
    return {nodes: TreeStore.getAll()};
}

var TreeBox = React.createClass({
    // propTypes: {
    // nodeLabel: React.PropTypes.renderable.isRequired
    // defaultCollapsed: React.PropTypes.bool,
    // },

    getInitialState: function() {
        return getState();
    },

    render: function() {
        return (
            <div className="fuelux">
                <ul className="tree" role="tree">
                    <Tree nodes={this.state.nodes} ancestry={Immutable.Vector()} />
                </ul>
            </div>
        );
    },

    componentDidMount: function() {
        TreeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TreeStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getState());
    }
});

module.exports = TreeBox;
