var React = require("react/addons");
var ModalActions = require("editor/actions/ModalActions");
var ModalStore = require("editor/stores/ModalStore");
var WatchStoreMixin = require("editor/mixins/WatchStore");

var Modal = React.createClass({
  mixins: [ WatchStoreMixin(ModalStore) ],

  getFluxState: function() {
    return ModalStore.getState();
  },

  handleCloseModal: function() {
    if (this.state.onClose) this.state.onClose(this);
    ModalActions.close();
  },

  handleApply: function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.onApply) this.state.onApply(this);
    ModalActions.close();
  },

  render: function() {
    if (!this.state.isVisible) return null;

    var modalStyle = {
      position: "absolute",
      "zIndex": "100"
      // top: this.props.y,
      // left: this.props.x
    };

    return (
      <div className="modal-dialog" style={modalStyle}>
        <div className="modal-content">
          <form onSubmit={this.handleApply}>
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" onClick={this.handleCloseModal}>
                <span aria-hidden="true">×</span><span className="sr-only">Cancel</span>
              </button>
              <h4 className="modal-title">{this.state.title}</h4>
            </div>
            <div className="modal-body">
              {this.state.content()}
            </div>
            <div className="modal-footer">
              <button data-name="Cancel" type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleCloseModal}>Cancel</button>
              <input data-name="Apply" type="submit" onClick={this.handleApply} className="btn btn-primary" value="Apply" />
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Modal;


