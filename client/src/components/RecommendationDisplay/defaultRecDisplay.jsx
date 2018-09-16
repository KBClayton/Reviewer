import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const DefaultRecDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
      <p id='defaultCardText'>We're sorry, there are currently no {props.type} available to recommend.</p>
      <button className=' mt-3 btn btn-outline-danger' id={props.buttonID} onClick={props.recScraper}>Check for New Recommendations</button> 
    </div>
  </div>
);

export default DefaultRecDisplay;