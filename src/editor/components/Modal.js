/** @jsx React.DOM */

var React = require("react/addons");
var ModalActions = require("editor/actions/ModalActions");

var Modal = React.createClass({

  handleCloseModal: function() {
    ModalActions.close();
  },

  handleApply: function() {
    this.props.onApply();
    ModalActions.close();
  },

  render: function() {
    var modalStyle = {
      position: "absolute",
      "zIndex": "100"
      // top: this.props.y,
      // left: this.props.x
    };

    return (
      <div className="modal-dialog" style={modalStyle}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" onClick={this.handleCloseModal}>
              <span aria-hidden="true">×</span><span className="sr-only">Cancel</span>
            </button>
            <h4 className="modal-title">{this.props.title}</h4>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-footer">
            <form action="">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleCloseModal}>Cancel</button>
              <button type="button" onClick={this.handleApply} className="btn btn-primary">Apply</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;


