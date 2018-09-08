import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const RecommendationDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
      <a href={props.link} target= "blank" rel="noopener noreferrer"><h5><b>{props.title}</b></h5></a>
      <p>{props.description}</p>
      <img src={props.imageLink} width='100px' />
      <p>{props.address}</p>
    </div>
  </div>
);

export default RecommendationDisplay;