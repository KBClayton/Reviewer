import React, {Component} from "react";
import { withRouter } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './Header.css';
import logo from './oddball4.png';
import axios from 'axios'

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      navStatus:'hidden',
      navStyle: {display: 'none'},
      searchInputClass: '',
      searchInputBackgroundColor: 'form-control',
      searchInput: ''

    }

    this.showNavBar = () =>{
      if (this.state.navStatus === 'hidden'){
        this.setState({navStyle: {padding: '1rem'}})
        this.setState({navStatus: 'shown'})
      }
      else {
        this.setState({navStyle: {display: 'none'}})
        this.setState({navStatus: 'hidden'})
      }
    }

    this.searchAll = (event) => {
      event.preventDefault();
      if (this.state.searchInput !== ''){
        let querySearch = "/searchResults/" + this.state.searchInput
        // console.log(querySearch)
        props.history.push(querySearch)
        this.setState({navStyle: {display: 'none'}})
        this.setState({navStatus: 'hidden'})
      }
      else{
        this.setState({searchInputClass: 'animated shake'})
        this.setState({searchInputBackgroundColor: 'bg-danger opaque form-control'})
        setTimeout(
          function() {
            this.setState({searchInputClass: ''});
            this.setState({searchInputBackgroundColor: 'form-control'})
          }
          .bind(this), 1000
        )
      }
    }
    this.logOut = () => {
      axios.delete('/api/user/logout')
        .then(res=>{
          console.log(res)
        })
    }
  }
  render() { 
    return (  
      <div>
        <div className="fixedWrapper bg-dark text-light border-bottom border-custom header opaque">
          <h1 className="mb-0 w-100 pl-3 pr-3 pt-3 text-center border-bottom border-light" >
            <div className='d-flex justify-content-between mb-1'>
              <div>
              <img src={logo} className="d-inline-block align-top img-logo" alt="oddball logo" />
              <span className='our-logo'>OddBall</span>
              </div>  
              <button onClick={this.showNavBar} className='fas fa-bars text-secondary border bg-dark border-secondary rounded navStatusButton'></button>
            </div>  
          </h1>
          {/* <p className='tagLine pl-3'>Reviewing Austin's Oddities</p> */}
          <div style={this.state.navStyle} className=''>
            <div className={this.state.searchInputClass}>
              <div className='input-group'>
                <input 
                  type="text" 
                  className={this.state.searchInputBackgroundColor}
                  value={this.state.searchInput}
                  onChange={e => this.setState({ searchInput: e.target.value})}
                  placeholder="Search..." 
                  aria-label="SearchAll" 
                  aria-describedby="button-addon2"
                />
                <div className="input-group-append" onClick={this.searchAll}>
                  <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                    <span className='fas fa-search'>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <br/>
            <Link to = '/CreateUser' className='text-success'>Sign Up FREE</Link>
            <br/>
            <Link to = '/login'>Log In</Link>
            <p className='mb-0' onClick={this.logOut}>LogOut</p>
            <div className='mb-3'/>
            <Link to = '/createnewlocation'>Post New Oddity</Link>
            <br/>
            <Link to = '/allproducts'>All Oddities</Link>
            <br/>
            <Link to = '/Search' className='text-success'>Local Suggestions</Link>
            <div className='mb-3'/>
            <Link to = '/chat'>Chat</Link>
          </div>
        </div>
        <div className='mt-30'></div>
      </div>

    );
  }
}
 
export default withRouter(Header);