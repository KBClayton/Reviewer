import React from "react";
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import './productComment.css'
// console.log(this.props.location.search);

const ProductComment = props => (
  <div>
    <div className='modalBackground' onClick={props.modalTrigger}/>
    <div className="customModalComment">
      <div className = 'card bg-light m-3 p-3'>
        <p className='text-center'>Write A Review</p>
        <textarea 
          className='border border-dark p-3' 
          onChange={props.textComment} 
          name="productComment" id={props._id} 
          cols="30" rows="10" 
          placeholder='Add your review here'
          value = {props.CommentText}  
        >
        </textarea>
        <button 
          className = 'btn btn-secondary btn-sm' 
          onClick={props.addComment}
        >
          Submit Comment
        </button>
      </div>
    </div>
  </div>
);

export default ProductComment;