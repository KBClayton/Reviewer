import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'

// console.log(this.props.location.search);

const DefaultRecDisplay = props => (
  <div>
    <div className = 'card p-3 m-3'>
      <p>We're sorry, there are currently no recommendations of this type</p>
      <button className=' mt-3 btn btn-outline-danger' onClick={props.foodScraper}>Check for New Recommendations</button> 
    </div>
  </div>
);

export default DefaultRecDisplay;