import React from "react";
<<<<<<< HEAD
// import { BrowserRouter, Route, Link } from 'react-router-dom'
=======
import { BrowserRouter, Route, Link } from 'react-router-dom'
>>>>>>> 198893009947411b51c2b8e204e1c9c0a0e74aee

const Header = props => (

  <div className="bg-green text-light border-bottom border-dark p-3">
    <h1 className="title text-center font-weight-bold">{props.title}</h1>
    <p className='text-info'>- {props.subpage}</p>

  </div>
);

export default Header;