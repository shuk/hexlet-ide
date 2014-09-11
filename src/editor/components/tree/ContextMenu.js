/** @jsx React.DOM */

var React = require("react/addons");

var ContextMenu = React.createClass({
    render: function() {
        var menuStyle = {
            position: "absolute",
            top: this.props.y,
            left: this.props.x
        };

        return (
            <div style={menuStyle} className="open">
                <ul className="dropdown-menu" role="menu">
                    {this.props.children.reduce(function(acc, group, index, array) {
                        var boundedGroup = group.map(function(item) {
                            return <li><a href="#" onClick={item.onClick}>{item.title}</a></li>;
                        })

                        if (array.length !== index + 1) {
                            boundedGroup.push(<li className="divider"></li>);
                        }

                        return acc.concat(boundedGroup);
                    }, [])}
                </ul>
            </div>
        );
    }
});

module.exports = ContextMenu;

