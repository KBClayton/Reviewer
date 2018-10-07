import React from "react";
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import './locationdisplay.css'

// console.log(this.props.location.search);
this.starNumberRender=(stars)=>{
  const starArray=[]
    var starInt = Math.floor(stars.Rating/1);
    var starRem = stars.Rating%1;
     for(let i=0; i<starInt; i++){
       starArray.push (<i className='fas fa-star'/>);
     }
     if (starRem > .25){
       starArray.push(<i className='fas fa-star-half'/>)
     }
    return (
      <div>
        {starArray}
        <small className="text-dark"> ({stars.noOfRatings} Ratings)</small>
      </div>
    )
}
this.starColor=(stars)=>{
  if (stars.Rating >= 4){
    return('text-success')
  }
  else if(stars.Rating >= 2.5){
    return ('text-warning')
  }
  else{
    return ('text-danger ')
  }
}

const LocationDisplay = props => (
  <div>
    <div className = 'shadow-box mb-3 mt-3 h-100'>
      <div className='p-3 bg-secondary rounded-top'>
        <img 
          src={props.imageUrl} 
          alt={props.title} 
          className='float-left mr-2'
          style={{'height': '80px'}}
        />
          <div className="">
            <h4>{props.title}</h4>
            {props.noOfRatings < 1 ? 
              (
                <p className='mb-2 text-dark clear-opacity'>{props.noOfRatings} Ratings</p>
              ):(
                <p className={this.starColor(props)}>
                  {this.starNumberRender(props)}
                </p>
              )
            } 
          <div> 
        </div>
      </div>
    </div>
    <div className='p-2 bg-light shadow-box rounded-bottom'>
      <a href={props.link}><p className='mb-1 text-info font-weight-bold'>Website</p></a> 
      <p className='mb-0 font-weight-bold'>Address:</p>
      <p><small className='text-muted'>  {props.address}</small></p> 
        <p className="mb-0 font-weight-bold">Description</p>
        <div className = 'text-muted'>
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