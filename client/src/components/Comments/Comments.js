import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import 

// console.log(this.props.location.search);
// console.log(props.reviews)

const CommentDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
    <h4  key={props._id} id={props._id}>Comment</h4>
      <p>{props.textComment}</p>
      <textarea
        name='reply'
        className='border border-dark'
        placeholder='Reply Here'
        onChange=''
      >
      </textarea>
      <button
        className='btn btn-outline-info mt-3'
        type='submit'
      >
        Send Reply
      </button>
      {props.reviews.map(reply=>)}
    </div>
    <br/>

  </div>
);

export default CommentDisplay;
