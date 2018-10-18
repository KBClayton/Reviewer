import React from "react";
// import { BrowserRouter, Route, Link } from 'react-router-dom';
// console.log(this.props.location.search);
// console.log(props.reviews)

const CommentDisplay = props => (
  <div>
    <div className = 'border p-2'>
      <div className='d-flex justify-content-end'>
        <p className=''>
          {props.thumbsUpAmount}  
          <span 
            onClick={props.thumbsUp} 
            id={props.id}
            value="1"
            banana='2'
            className={props.thumbsUpIcon}
          />
          {props.thumbsDownAmount}
          <span
            onClick={props.thumbsUp} 
            id={props.id}
            value="-1"
            className = {props.thumbsDownIcon}
          />
        </p>
      </div>
      <div className='p-3 bg-light'>
        <p><i>"{props.textComment}"</i></p>
        <p className='mb-0 text-right'>-<b>{props.CommentUser}</b></p>
        <p className='mb-0 text-right font-weight-bold'><small><u>{props.CommentDate}</u></small></p>
      </div>
      <p className='text-center'><small>{props.length}</small></p>
      {props.ReplyTxt ? (
        <a className='text-center' href={'/reply/' + props.id}>
        <button className='bg-info p-1 font-poppins p rounded'>Reply <i className ='fas fa-comment'/>
        </button>
        
        </a>
      ):(
        <div/>
      )
      }
      
    </div>
    <br/>
    

  </div>
);

export default CommentDisplay;
