import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const LocationDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
      <a href={`//${props.link}`} target='_blank'><h5><b>{props.title}</b></h5></a>
      <p>{props.description}</p>
      {/* <a href='localhost:3001/api/articles'><button className = 'btn-danger'>Save</button></a> */}
      <Link to={props.urlLink}><button className = "btn btn-info m-3" >{props.CommentButton}</button></Link>
      <p><small>{props.lengthNo} Comments</small></p>
      <p className = 'mb-0'><b>{props.Rating}</b></p>  
          
      {props.noOfRatings === 0 &&
        <p className = 'mb-0'><b>{props.Rating} Lemon</b></p>
      }
      <p>{props.noOfRatings}</p>
      <h1>
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
      </h1>
      {/* <button className=' mt-3 btn btn-outline-danger' onClick={props.SubmitHandler}>Submit Rating</button> */}

    </div>
  </div>
);

export default LocationDisplay;