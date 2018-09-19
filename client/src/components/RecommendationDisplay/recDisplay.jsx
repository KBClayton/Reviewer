import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

const RecDisplay = props => (
  <div>
      <div className = 'card p-3 m-3 bg-light'>
      <div className="row">
        <div className="col-12">
          
            <div className='p-2 bg-light border border-secondary text-dark mb-2'>
              <h3 className='mb-0 text-info'>
                <a href={props.link} target='_blank' >
                  <b>
                    {props.title}                   
                  </b>
                </a>
              </h3>
              <p className='mb-0'>
                <small>
                  {props.author}
                </small>
                <br></br>
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
              src={props.imageURL} 
              alt={props.title} 
              className='img-responsive w-100'
            />
        </div>
        <div className="col-md-8 col-lg-9 col-xl-10">
            <p
              style = {{textDecoration: 'none'}}
              className = 'overflowTextDescription text-dark'
            >
              {props.description}{props.storePrefix} 
              <a href={props.storeLink} target='_blank'>
                  {props.store}
              </a>{props.storeSuffix}
            </p>
            
        </div>
        <div>
          <button className=' mt-3 btn btn-outline-danger' style={{display: props.addEnabled}} onClick={props.submitMe}>Add this {props.type} </button>
          <button className=' mt-3 btn btn-outline-primary' onClick={props.refresh}>Show me a new {props.type} </button>
          <button className=' mt-3 btn btn-outline-success' style={{display: props.imageAvailable}} onClick={props.retrieveImage}>Refresh image</button>
          <button className=' mt-3 btn btn-outline-success' style={{display: props.areYou512}} onClick={props.refreshEvents}>Refresh events</button>
        </div>
        <div style={{display: props.addDisabled}}>
          <small>
            {props.titleAdded}{props.addedHelper}{props.userAdded}
          </small>
        </div>
      </div>
    </div>
  </div>
);

export default RecDisplay;