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
    return('text-center text-success')
  }
  else if(stars.Rating >= 2.5){
    return ('text-center text-warning')
  }
  else{
    return ('text-center text-danger ')
  }
}

const LocationDisplay = props => (
  <div>
    {/* <Link to={props.urlLink}>{props.CommentButton} */}
      <div className = 'shadow-box mb-3 border-0 h-100'
                style={{
                  'background-image': `url(${props.imageUrl})`,
                  'background-position': 'center',
                  'background-repeat': 'no-repeat',
                  'background-size': 'cover',
                  'opacity': '.7'
                }}
      >
        <div 
          className='p-2 border-bottom border-secondary' 
        >
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
            {/* <img 
                src={props.imageUrl} 
                alt={props.title} 
                className='float-left mr-2'
                style={{'height': '30px'}}
              /> */}
            <div className="ml-2">
              
            </div>
          </div>
        </div>
      <div className='p-2 light'>
        <p className=''>
          <small className='text-muted'>  {props.address}</small>
        </p> 
        <div className = 'overflowTextDescription text-muted bg-white border-0'>
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