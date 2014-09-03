/** @jsx React.DOM */

var Leaf = React.createClass({
    render: function() {
        var item = this.props.item

        return (
            <li className="tree-item" data-template="treeitem" role="treeitem">
                <button className="tree-item-name">
                    <span className="glyphicon icon-item fueluxicon-bullet"></span>
                    <span className="tree-label">{item.name}</span>
                </button>
            </li>
        );
    }
});

module.exports = Leaf;
