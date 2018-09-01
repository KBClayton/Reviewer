import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const CommentDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
    <h4  key={props._id} id={props._id}>I am a Comment</h4>
      <p>{props.textComment}</p>
      <p><small>{props.lengthNo} Comments</small></p>
    </div>
  </div>
);

export default CommentDisplay;