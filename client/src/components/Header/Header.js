import React from "react";
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import './Header.css';

const Header = props => (

  <div className="bg-dark text-light border-bottom border-dark p-3 header">
    <h1 className="title text-center font-weight-bold">{props.title}</h1>
    <p className='text-info'>- {props.subpage}</p>

  </div>
);

export default Header;