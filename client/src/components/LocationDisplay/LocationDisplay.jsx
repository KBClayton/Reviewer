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
        <div className="">
          <img 
            src={props.imageUrl} 
            alt={props.title} 
            className=''
            style={{'height': '80px'}}
          />
          <h4 className='font-acme text-white mt-1'>{props.title}</h4>
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
    <div className=' font-acme p-2 bg-light shadow-box rounded-bottom'>
      {props.link != ''?
        (
          <a href={props.link} target='_none' className=''><p style={{'padding': '4px'}} className='rounded mb-1 text-white bg-info d-inline-block font-weight-bold'>Website</p></a> 
        ):
        (
          <div/>
        )
      }

      <p className='mb-1 mt-1 font-weight-bold'>Address:</p>
      <p className=' mb-1 text-muted'>{props.address}</p> 
      <p className="mb-1 font-weight-bold">Description</p>
      <div className = ' font-raleway text-muted'>{props.description}</div>
      <p style = {{textDecoration: 'none'}} className='line-height-1 mt-2 text-secondary text-center'><small><span className='font-weight-bold'> {props.lengthNo}</span> Comments</small></p>
          
              
        {/* {props.noOfRatings === 0 &&
          <p style = {{textDecoration: 'none'}} className = 'mb-0'><b>{props.Rating} Lemon</b></p>
        } */}
        
        {/* <button className=' mt-3 btn btn-outline-danger' onClick={props.SubmitHandler}>Submit Rating</button> */}
        {props.submitButton}
        {props.modalTrigger ? (
          <div className="mt-1 text-center">
            <button onClick = {props.modalTrigger} className='p-1 bg-info font-acme rounded' style={{'fontSize': '18px'}} >
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