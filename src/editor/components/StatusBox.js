var React = require("react/addons");
var IdeStore = require("editor/stores/IdeStore");

var StatusBox = React.createClass({

  render: function() {
    return (
      <div className="status-box">
        <div className="btn-group-vertical" role="group">
          <button type="button" className={this.getStatusClasses()}>
            <span className={this.getStatusInnerClasses()} />
          </button>
        </div>
      </div>
    );
  },

  getStatusClasses: function() {
    var cx = React.addons.classSet;
    var buttonType = IdeStore.getState().connected ?
      "btn-success" :
      "btn-danger";
    var classes = {
      "btn": true
    };
    classes[buttonType] = true;
    return cx(classes);
  },

  getStatusInnerClasses: function() {
    var cx = React.addons.classSet;
    var glyphiconType = IdeStore.getState().connected ?
      "glyphicon-ok-circle" :
      "glyphicon-remove-circle";
    var classes = {
      "glyphicon": true
    };
    classes[glyphiconType] = true;
    return cx(classes);
  }
});

module.exports = StatusBox;
