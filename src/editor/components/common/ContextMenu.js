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
      <div style={menuStyle} className="open context-menu">
        <ul className="dropdown-menu" role="menu">
          {this.state.options.reduce(function(acc, group, index, array) {
            var boundedGroup = group.map(function(item) {
              return <li key={item.title}><a href="#" data-name={item.title} onClick={this.clickHandler(item.onClick)}>{item.title}</a></li>;
            }, this);

            if (array.length !== index + 1) {
              boundedGroup.push(<li key={"divider_" + index} className="divider"></li>);
            }

            return acc.concat(boundedGroup);
          }.bind(this), [])}
        </ul>
      </div>
    );
  },

  clickHandler: function(onClick) {
    return function(e) {
      e.preventDefault();
      onClick();
    }
  }
});

module.exports = ContextMenu;
