import React from "react";
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import './locationdisplay.css'

// console.log(this.props.location.search);

const LocationDisplay = props => (
  <div>
    {/* <Link to={props.urlLink}>{props.CommentButton} */}
      <div className = 'card p-2 mb-3 bg-light h-100'>
        <div className='d-flex mb-2 pb-2 border-bottom border-secondary'>
          <div className="">
            <img 
              src={props.imageUrl} 
              alt={props.title} 
              className='img-responsive img-max60'
            />
          </div>
          <div className="ml-2">
            {props.link ? (
              <a href={`//${props.link}`} target='_blank'>
                <div>
                  <h4 className='text-info poorStory'>{props.title}</h4>
                  <p className='mb-0 text-dark'>
                    <small>
                      {props.address}
                    </small>
                  </p> 
                </div>
              </a>               
            ):(
              <div>
                <h4 className='text-info mb-0 poorStory'> 
                  {props.title}
                </h4>
                <p className='mb-0 text-dark'>
                  <small>
                    {props.address}
                  </small>
                </p> 
               
              </div>
            )}
          </div>
        </div>
        {props.noOfRatings < 1 ? 
          (
            <p style = {{textDecoration: 'none'}} className='mb-2 text-dark'>{props.noOfRatings} People have rated this</p>
          ):(
            <div className='mb-3'>
              {props.Rating >= 2.5 ? (
                <span style = {{textDecoration: 'none'}} className = 'm-0 text-success'><b>{props.Rating} Stars</b></span>
              ):(
                <span style = {{textDecoration: 'none'}} className = 'm-0 text-danger'><b>{props.Rating} Stars</b></span>
              )}

              
              <span style = {{textDecoration: 'none'}} className='m-0 text-dark'><small><i> ({props.noOfRatings} Ratings)</i></small></span>
            </div>
          )
        } 
      <div>
        <div className = 'overflowTextDescription text-dark bg-white'>
          {props.description}
        </div>
        <p style = {{textDecoration: 'none'}} className='text-secondary text-center'><small><span className='font-weight-bold'> {props.lengthNo}</span> Comments</small></p>
          
              
        {/* {props.noOfRatings === 0 &&
          <p style = {{textDecoration: 'none'}} className = 'mb-0'><b>{props.Rating} Lemon</b></p>
        } */}
        
        {/* <button className=' mt-3 btn btn-outline-danger' onClick={props.SubmitHandler}>Submit Rating</button> */}
        {props.submitButton}
        {props.modalTrigger ? (
          <div className="text-center">
            <button onClick = {props.modalTrigger} className='btn btn-secondary'>
              <i className='fas fa-comment'></i>
              <span> Write A Review</span>
            </button>
          </div>
        ):(
          <div/>
        )
        }
        
      </div>
    </div>
  </div>
);

export default LocationDisplay;