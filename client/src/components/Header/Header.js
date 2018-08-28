import React from "react";
// import { BrowserRouter, Route, Link } from 'react-router-dom'

const Header = props => (

  <div className="bg-green text-light border-bottom border-dark p-3">
    <h1 className="title text-center font-weight-bold">{props.title}</h1>
    <p className='text-info'>- {props.subpage}</p>

  </div>
);

export default Header;