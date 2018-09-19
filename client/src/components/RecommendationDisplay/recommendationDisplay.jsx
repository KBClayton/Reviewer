import React from "react";
// import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const RecommendationDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
      <a href={props.link} target= "blank" rel="noopener noreferrer"><h5><b>{props.title}</b></h5></a>
      <p>{props.description}</p>
      <img src={props.imageLink} alt='' width='100px' />
      <button className=' mt-3 btn btn-outline-danger' onClick={props.submitMe}>Add this {props.type} </button>
      <button className=' mt-3 btn btn-outline-primary' onClick={props.refresh}>Show me a new {props.type} </button>
    </div>
  </div>
);

export default RecommendationDisplay;