var React = require("react/addons");
var TreeActions = require("editor/actions/TreeActions");

var ActionsBox = React.createClass({

  render: function() {
    return (
      <div className="action-box">
        <div className="input-group-btn">
          <button onClick={this.refreshFileTree} type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-refresh"/>
          </button>
        </div>
      </div>
    );
  },

  refreshFileTree: function() {
    TreeActions.loadTree();
  }
});

module.exports = ActionsBox;
