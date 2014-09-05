/** @jsx React.DOM */

var _ = require("lodash");
var Immutable = require("immutable");
var React = require("React");

var Tree = require("./Tree");
var FSStore = require("stores/FSStore");
var TreeActions = require("actions/TreeActions");

function getState() {
    return {nodes: FSStore.getAllNodes()};
}

var Box = React.createClass({
    // propTypes: {
    // nodeLabel: React.PropTypes.renderable.isRequired
    // defaultCollapsed: React.PropTypes.bool,
    // },

    getInitialState: function() {
        return getState();
    },

    toggleFolderState: function(ancestry) {
        TreeActions.toggleFolderState(ancestry);
    },

    render: function() {
        return (
            <div className="fuelux">
                <ul className="tree" role="tree">
                    <Tree nodes={this.state.nodes} ancestry={Immutable.Vector()} toggleFolderState={this.toggleFolderState} />
                </ul>
            </div>
        );
    },

    componentDidMount: function() {
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
