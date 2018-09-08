import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const LocationDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
      <a href={`//${props.link}`} target='_blank'><h5><b>{props.title}</b></h5></a>
      <p>{props.description}</p>
      {/* <a href='localhost:3001/api/articles'><button className = 'btn-danger'>Save</button></a> */}
      <Link to={props.urlLink}><button className = "btn btn-info m-3" >Comments</button></Link>
      <p><small>{props.lengthNo} Comments</small></p>

      <select className = 'border border-dark' name="Rating" onChange = {props.setRating} id="r1">
        <option value="1">1 Star</option>
        <option value="2">2 Star</option>
        <option value="3">3 Star</option>
        <option value="4">4 Star</option>
        <option value="5">5 Star</option>
      </select>

      <button className=' mt-3 btn btn-outline-danger' onClick={props.SubmitHandler}>Submit Rating</button>

    </div>
  </div>
);

export default LocationDisplay;