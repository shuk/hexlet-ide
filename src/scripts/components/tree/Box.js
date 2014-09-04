/** @jsx React.DOM */

var Tree = require("./Tree.js");
var _ = require("lodash/dist/lodash");
var Immutable = require("immutable");

var Box = React.createClass({
    // propTypes: {
    // nodeLabel: React.PropTypes.renderable.isRequired
    // defaultCollapsed: React.PropTypes.bool,
    // },

    getInitialState: function() {
        return {nodes: this.props.nodes};
    },

    toggleFolderState: function(ancestry) {
        var nodes = this.replaceIn(ancestry.first(), ancestry.rest(), this.state.nodes);

        this.setState({nodes: nodes});
    },

    replaceIn: function(id, ancestry, nodes) {
        var index = _.findIndex(nodes, {id: id});
        var item = nodes[index];

        if (undefined == ancestry || ancestry.length == 0) {
            item.state = ("opened" == item.state) ? "closed" : "opened";
        } else {
            var children = item.children;
            item.children = this.replaceIn(ancestry.first(), ancestry.rest(), children);
        }
        return nodes;
    },


    render: function() {
        return (
            <div className="fuelux">
                <ul className="tree" role="tree">
                    <Tree nodes={this.state.nodes} ancestry={Immutable.Vector()} toggleFolderState={this.toggleFolderState} />
                </ul>
            </div>
        );
    }
});

module.exports = Box;
