import React from 'react';
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import './Footer.css';

class Footer extends React.Component {
  constructor(props){
    super(props);

    this.state = { 
      
    }  
  }
      

  render() { 

    return (  
      <div className="footer bg-dark text-white text-center p-0">
        <p className='p-0 m-0'>Footer</p>
      </div>
    );
  }
}
 
export default Footer;