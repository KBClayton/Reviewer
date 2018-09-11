import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom';
// console.log(this.props.location.search);
// console.log(props.reviews)

const CommentDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
    <h4 key={props.id} id={props.id}><small><u>{props.CommentType}</u></small></h4>
      <p>{props.textComment}</p>
      {/* <textarea
        name='reply'
        className='border border-dark'
        placeholder='Reply Here'
        onChange=''
      >
      </textarea> */}
      <button onClick={props.thumbsUp} id={props.id} value="1">
        thumbs up 
      </button>
      <button onClick={props.thumbsUp} id={props.id} value="-1">
        thumbs down
      </button>
      <a href={'/reply/' + props.id}>{props.ReplyTxt}</a>
      <p><b>{props.length}</b></p>
    </div>
    <br/>
    

  </div>
);

export default CommentDisplay;
