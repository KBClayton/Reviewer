import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './AddComment-modal.css'

// console.log(this.props.location.search);

const AddCommentModal = props => (
  <div>
    <div className="modal-overlay-div" style={overlayStyle} />
    <div className="modal-content-div" style={contentStyle} onClick={this.onOverlayClick.bind(this)}>
      <div className="modal-dialog-div" style={dialogStyle} onClick={this.onDialogClick}>
        {this.props.children}
      </div>
    </div>
  </div>
);

export default AddCommentModal;