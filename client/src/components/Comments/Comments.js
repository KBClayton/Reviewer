import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const CommentDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
    <h4>I am a Comment</h4>
      <p>{prop.commentText}</p>
    </div>
  </div>
);

export default CommentDisplay;