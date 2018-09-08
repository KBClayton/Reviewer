import React from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './Header.css';

const Header = props => (

  <div className="bg-dark text-light border-bottom border-dark p-3 header">
    <h1 className="title text-center font-weight-bold">{props.title}</h1>
    <p className='text-info mb-0 pb-0'>- {props.subpage}</p>
    <Link to = '/CreateUser'>Create User</Link>
    <br/>
    <Link to = '/login'>Log In</Link>
    <br/>
    <Link to = '/createnewlocation'>ADD Location</Link>
    <br/>    
    <Link to = '/allproducts'>All Locations</Link>
    <br/>
    <Link to = '/Search'>Search</Link>

  </div>
);

export default Header;