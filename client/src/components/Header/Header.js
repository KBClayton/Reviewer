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
      searchInput: '',
      username: ''

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
          props.history.push('/login')
        })
    }
    this.checkCookie =()=>{
      let cookieVars=document.cookie;
      let cookieObj={};
      console.log(cookieVars);
      if(cookieVars!==undefined){
        //console.log("in cookievars if")
      cookieVars=cookieVars.replace(/=/g, " ")
      let cookieArray= cookieVars.split(" ")
      let username;
        if(cookieArray.length>0){
          for(let i=0; i<cookieArray.length; i++){
          //console.log("in cookiearray if")
            if(cookieArray[i]==="username"){
              username=cookieArray[i+1].substring(0, cookieArray[i+1].length)
            }
          }
          cookieObj.username=username;
          // console.log("this is cookie object")
          // console.log(cookieObj)
          if(cookieObj.username!==undefined && cookieObj.username.length>5)
          {
            //console.log(cookieObj.username)
          this.setState({ username: cookieObj.username });
          return true;
          }
        }
      }else{
        return false
        //console.log("not logged in")
      } 
    }

    this.componentDidMount =()=>{
      this.checkCookie();
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
           
            <br/>
            {this.state.username.length > 0 ? (
              <div>
                <p className = 'mb-0'>Logged in as {this.state.username}</p>
                <br/>
                <Link to = '/profile'>My Profile</Link>
              </div>
            ):(
                <div> 
                  <Link to = '/CreateUser' className='text-success'>Sign Up FREE</Link>
                  <Link to = '/login'>Log In</Link>
                </div>
            )}
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