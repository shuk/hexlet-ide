var React = require("react/addons");

var Loader = React.createClass({
  getInitialState: function() {
    return { frame: 0 };
  },

  componentDidMount: function() {
    this.tick();
  },

  tick: function() {
    var frame = this.state.frame;
    var newFrame = frame > 7 ? 1 : frame + 1;
    this.setState({ frame: newFrame });
    this.setState({ timer: setTimeout(this.tick, 300) });
  },

  render: function() {
    return <div className="fuelux">
      <div className="loader" data-initialize="loader" data-frame={this.state.frame}></div>
    </div>;
  },

  componentWillUnmount: function() {
    clearTimeout(this.state.timer);
  }
});

module.exports = Loader;
