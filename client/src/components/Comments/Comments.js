import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom';
// console.log(this.props.location.search);
// console.log(props.reviews)

const CommentDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
    <p key={props.id} id={props.id}><small><u>{props.CommentType}</u></small></p>
      <p><i>"{props.textComment}"</i></p>
        {/* {props.replies.map(reply=>( */}
          {/* <p>Banna</p> */}
        {/* ))} */}
        
      <h3>
      <span 
        onClick={props.thumbsUp} 
        id={props.id} 
        value="1"
        className={props.thumbsUpIcon}
      />
      <span> </span>
      <span
        onClick={props.thumbsUp} 
        id={props.id} 
        value="-1"
        className = {props.thumbsDownIcon}
        />
      </h3>
      <a href={'/reply/' + props.id}>{props.ReplyTxt}</a>
      <p><b>{props.length}</b></p>
      <h4>{props.thumbsUpAmount}{props.thumbsDownAmount}</h4>
    </div>
    <br/>
    

  </div>
);

export default CommentDisplay;
