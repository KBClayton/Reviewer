import React from "react";
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import './productComment.css'
// console.log(this.props.location.search);

const ProductComment = props => (
  <div>
    <div className='modalBackground' onClick={props.modalTrigger}/>
    <div className="customModalComment">
      <div className = 'shadow-box bg-light m-3 p-3'>
        <h6 className=' mb-2 text-center font-poppins text-info'>Write A Review</h6>
        <div className="w-100 text-center m-1">
        <textarea 
          className='border border-dark p-1' 
          onChange={props.textComment} 
          name="productComment" id={props._id}
          placeholder='Add your review here'
          value = {props.CommentText}  
        >
        </textarea>
        </div>
        <div className="text-center">
          <button 
            className = 'p-1 font-raleway bg-success text-white' 
            onClick={props.addComment}
            style={{'fontSize': '18px'}}
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductComment;