import React from "react";
// import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const RateProductStars = props => (
  <div>
    <p className='text-center mb-0 text-primary font-weight-bold'>Rate This Place</p>
    <h1 className = 'text-center'>
      <b>
        {props.title}
        <span 
        id='1'
        val = '1'
        className ='fa fa-star'
        onClick = {props.setRating}
      />
      <span 
        id='2'
        val = '2'
        className ='fa fa-star'
        onClick = {props.setRating}
      />
      <span 
        id='3'
        val= '3'
        className ='fa fa-star'
        onClick = {props.setRating}
      />
      <span 
        id='4'
        val = '4'
        className ='fa fa-star'
        onClick = {props.setRating}
      />
      <span 
        id='5'
        val = '5'
        className ='fa fa-star'
        onClick = {props.setRating}
      />
      </b>
    </h1>
  </div>
);

export default RateProductStars;