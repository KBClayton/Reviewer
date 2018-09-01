import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const LocationDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
      <a href={props.link}><h5><b>{props.title}</b></h5></a>
      <p>{props.description}</p>
      {/* <a href='localhost:3001/api/articles'><button className = 'btn-danger'>Save</button></a> */}
      <Link to={props.urlLink}><button className = "btn btn-info m-3" >Comments</button></Link>
      {/* <p><small>{props.comments} Comments</small></p> */}
    </div>
  </div>
);

export default LocationDisplay;