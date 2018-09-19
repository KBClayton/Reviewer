import React from "react";
// import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const Replies = props => (
  <div className = 'card m-3 p-3'>
    <textarea 
      className='border border-dark p-3' 
      onChange={props.onChange} 
      name="Replies" id={props._id} 
      cols="30" rows="10" 
      placeholder='Add your review here'>
    </textarea>
    <button 
      className = 'btn btn-secondary btn-sm' 
    >
      Submit Comment
    </button>
  </div>
);

export default Replies;