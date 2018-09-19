import React from "react";
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import './locationdisplay.css'

// console.log(this.props.location.search);

const LocationDisplay = props => (
  <div>
    {/* <Link to={props.urlLink}>{props.CommentButton} */}
      <div className = 'card p-3 m-3 bg-light'>
      <div className="row">
        <div className="col-12">
          

          
            <div className='p-2 bg-light border border-secondary text-dark mb-2'>
              <h3 className='mb-0 text-info'>
                <b>
                {props.link ? (
                    <a href={`//${props.link}`} target='_blank'>
                     {props.title}
                    </a>               
                  ):(
                    <div>{props.title}</div>
                )}
              
                </b>
              </h3>
              <p className='mb-0'>
                <small>
                  {props.address}
                </small>
              </p>
            </div>
          
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-lg-3 col-xl-2">
            <img 
              src={props.imageUrl} 
              alt={props.title} 
              className='img-responsive w-100'
            />
        </div>
        <div className="col-md-8 col-lg-9 col-xl-10">
            <p
              style = {{textDecoration: 'none'}}
              className = 'overflowTextDescription text-dark'
            >
              {props.description}
            </p>
            <p><small>{props.lengthNo} Comments</small></p>
            <p className = 'mb-0'><b>{props.Rating}</b></p>  
                
            {props.noOfRatings === 0 &&
              <p className = 'mb-0'><b>{props.Rating} Lemon</b></p>
            }
            <p>{props.noOfRatings}</p>
            {/* <button className=' mt-3 btn btn-outline-danger' onClick={props.SubmitHandler}>Submit Rating</button> */}
            {props.submitButton}
          </div>
        </div>
      </div>
    {/* </Link> */}
  </div>
);

export default LocationDisplay;