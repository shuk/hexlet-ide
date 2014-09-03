/** @jsx React.DOM */

var Tree = require("./Tree.js");
var _ = require("lodash/dist/lodash");
var mori = require("mori/mori.js");

var Box = React.createClass({
    // propTypes: {
    // nodeLabel: React.PropTypes.renderable.isRequired
    // defaultCollapsed: React.PropTypes.bool,
    // },

    getInitialState: function() {
        return {nodes: this.props.nodes};
    },

    toggleFolderState: function(ancestry) {
        var nodes = this.replaceIn(mori.first(ancestry), mori.rest(ancestry), this.state.nodes);

        this.setState({nodes: nodes});
    },

    replaceIn: function(id, rest, nodes) {
        var index = _.findIndex(nodes, {id: id});
        var item = nodes[index];

        if (undefined == rest || mori.count(rest) == 0) {
            item.state = ("opened" == item.state) ? "closed" : "opened";
        } else {
            var children = item.children;
            item.children = this.replaceIn(mori.first(rest), mori.rest(rest), children);
        }
        return nodes;
    },


    render: function() {
        return (
            <div className="fuelux">
                <ul className="tree" role="tree">
                    <Tree nodes={this.state.nodes} ancestry={mori.vector()} toggleFolderState={this.toggleFolderState} />
                </ul>
            </div>
        );
    }
});

module.exports = Box;
