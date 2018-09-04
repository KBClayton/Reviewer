import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const ProductComment = props => (
  <div className = 'card m-3 p-3'>
    <textarea onChange={props.textComment} name="productComment" id={props._id} cols="30" rows="10"></textarea>
    <button className = 'btn btn-secondary btn-sm' onClick={props.addComment}>Submit Comment</button>
  </div>
);

export default ProductComment;