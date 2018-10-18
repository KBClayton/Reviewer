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
      <div>
        <div style={{height: '35px'}}> </div>
        <div className="footer bg-dark text-white text-center p-0">
          <a href='#'><p className='p-0 m-0 font-marker text-white'>OddBall</p></a>
        </div>
      </div>
    );
  }
}
 
export default Footer;