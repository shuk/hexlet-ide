/** @jsx React.DOM */
var React = require("react/addons");

var WatchStoreMixin = require("editor/mixins/WatchStore");
var ContextMenuStore = require("editor/stores/ContextMenuStore");

var ContextMenu = React.createClass({
  mixins: [ WatchStoreMixin(ContextMenuStore) ],

  getFluxState: function() {
    return ContextMenuStore.getState();
  },

  render: function() {
    if (!this.state.isVisible) return null;

    var menuStyle = {
      position: "fixed",
      zIndex: 100,
      top: this.state.coords.y,
      left: this.state.coords.x
    };

    return (
      <div style={menuStyle} className="open">
        <ul className="dropdown-menu" role="menu">
          {this.state.options.reduce(function(acc, group, index, array) {
            var boundedGroup = group.map(function(item) {
              return <li><a href="#" data-name={item.title} onClick={item.onClick}>{item.title}</a></li>;
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
