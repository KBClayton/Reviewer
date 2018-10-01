import React from "react";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
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
      username: '',
      searchResults: []

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
      // console.log(cookieVars);
      if(cookieVars!==undefined){
        //console.log("in cookievars if")
      cookieVars=cookieVars.replace(/=/g, " ")
      let cookieArray= cookieVars.split(" ")
      let username;
        if(cookieArray.length>0){
          for(let i=0; i<cookieArray.length; i++){
          //console.log("in cookiearray if")
            if(cookieArray[i]==="username"){
              if(cookieArray[i+1][cookieArray[i+1].length]===";"){
                username=cookieArray[i+1].substring(0, cookieArray[i+1].length-1)
              }else{
                username=cookieArray[i+1].substring(0, cookieArray[i+1].length)
              }
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

    this.searchData = () => {
      if (this.state.searchInput.length > 0){
        axios.post(`/api/product/search/${this.state.searchInput}`, {description: this.state.searchInput})
          .then(res => {

          if (res.data.length === 0){
            this.setState({searchResults: [{title: 'There are no results'}]})
            console.log(this.state.searchResults)
          }
          else{
            // const tempArray = res.data.slice(0,9)
            this.setState({searchResults: res.data.slice(0,9)})

          }
          
        })
      }
        else{
          this.setState({searchResults: []})
        }
      }

      this.searchInput = async (event)=>{
        await this.setState({searchInput: event.target.value})
        // if (this.state.searchInput.length > 0){
        //   return;
        // }
        this.searchData();
      }
  }
  render() { 

    return (  
      //Navbar Wrapper
      <div>
      <div className='navMain'>

        {/* Small Screen */}
        <div className='navTop-sm'>
          <h1 className="mb-0 w-100 pl-3 pr-3 pt-3 text-center border-bottom border-light">
            <div className='d-flex justify-content-between mb-1'>
              <button onClick={this.showNavBar} className='fas fa-bars text-secondary border bg-dark border-secondary rounded navStatusButton'></button>
              <div>
                <img src={logo} className="img-logo" alt="oddball logo" />
                <span className='our-logo'>OddBall</span>
              </div>  
              
            </div>  
          </h1>
        </div>


        {/* LargeScreen */}
        <div className='navTop-lg'>
          <h1 className='our-logo text-center p-3'>OddBall</h1>
          
          {/* LOGGED IN */}
          {this.state.username.length > 0 ? (
            <div className="bg-light border-bottom border-dark">
            <div className='container'>
              <p className=' fixed-right-login text-info'>Logged In <i className='text-success fa fa-check-circle'/></p>
              <div className='d-flex'>
                {/* <p className = 'mb-3 text-secondary'>Logged in as: <b className='loggedInUN poorStory'>{this.state.username}</b> <i className='text-success fa fa-check-circle'/></p> */}
                <div className='w-20'>
                  <p className='mb-0 text-dark font-weight-bold' id='searchIcon'>Search</p>
                  <div id='searchTab'>
                    <Link to = '/usersearch' className='mb-0 font-weight-bold'>Search Users</Link>
                    <p className='mb-0 text-primary font-weight-bold'>Search Locations</p>
                  </div>
                </div>

                <div className='w-20'>
                  <p className='mb-0 text-dark font-weight-bold' id='locationIcon'>Locations</p>
                  <div id='locationTab'>
                    <Link to = '/allproducts' className='mb-0 font-weight-bold'>See All</Link>
                    <br/>
                    <Link to = '/createnewlocation' className='mb-0 font-weight-bold'>Add A Location</Link>
                  </div>
                </div>

                <div className="w-20">
                <Link to = '/Search' className='mb-0 font-weight-bold text-dark'>Suggestions</Link>
                </div>
                <div className="w-20">
                <Link to = '/chat' className='mb-0 font-weight-bold text-dark'>Chat</Link>
                </div>
                <div className='w-20'>
                  <p className='mb-0 font-weight-bold text-dark'  id='accountIcon'>Account</p>
                  <div id='accountTab'>
                    <p className='mb-0 text-success font-weight-bold'>{this.state.username}</p>
                    <Link to = '/profile' className='text-secondary mb-0 font-weight-bold'>My Account</Link>
                    <br/>
                    <p className='btn text-danger mb-0 font-weight-bold p-0' onClick={this.logOut} id='logout'>LogOut</p>
                  </div>
                </div>

              </div>
            </div>
            </div>
          ):(
            // NOT LOGGED IN
            <div className="bg-light border-bottom border-dark">
            <div className='container'>
              <div className='d-flex'> 
                {/* <Link to = '/createnewlocation'>Post New Oddity</Link> */}
                <Link to = '/allproducts' className='w-20 text-secondary font-weight-bold'>Locations</Link>
                <Link to = '/Search' className='w-20 text-secondary font-weight-bold'>Suggestions</Link>

                <Link to = '/CreateUser' className='w-20 font-weight-bold text-success'>SIGN UP</Link>
                <Link to = '/login' className='w-20 text-secondary font-weight-bold '>Log In</Link>
                <Link to = '/chat' className='w-20 text-secondary font-weight-bold'>Chat <i className='fas fa-lock'/></Link>
              </div>
            </div>
            </div>
          )}

        </div>











        <div style={this.state.navStyle} className='poorStory'>
          <div className={this.state.searchInputClass}>
            <div className='input-group mb-0'>
              <input 
                type="text" 
                className={this.state.searchInputBackgroundColor}
                value={this.state.searchInput}
                // onChange={e => this.setState({ searchInput: e.target.value})}
                onChange = {this.searchInput}
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
              {/* Map AutoSearch Results */}
              {this.state.searchResults.map(result=>(
                <p  key={result._id} className=''><a href={`/location/${result._id}`} className='bg-danger text-white' key={result._id}>{result.title}</a></p>
              ))}
            </div>
          </div>
          <br/>
          {this.state.username.length > 0 ? (
            <div>
              <p className = 'mb-3 text-secondary'>Logged in as: <b className='loggedInUN poorStory'>{this.state.username}</b> <i className='text-success fa fa-check-circle'/></p>
              <Link to = '/profile' className='text-white'>My Profile</Link>
              <br/>
              <Link to = '/usersearch'>FindOtherUsers</Link>
              <br/>
              <div className='mb-3'/>
              <Link to = '/createnewlocation'>Post New Oddity</Link>
              <br/>
              <Link to = '/allproducts'>All Oddities</Link>
              <br/>
              <Link to = '/Search' className='text-success'>Local Suggestions</Link>
              <div className='mb-3'/>
              <Link to = '/chat'>Chat</Link>
              <br/>
              <p className='mb-0 btn pl-0 pr-0 text-danger' onClick={this.logOut}>LogOut</p>
            </div>
          ):(
            <div> 
              <Link to = '/CreateUser' className='text-success'>Sign Up FREE</Link>
              <br/>
              <Link to = '/login'>Log In</Link>
              <div className='mb-3'/>
              {/* <Link to = '/createnewlocation'>Post New Oddity</Link> */}
              <br/>
              <Link to = '/allproducts'>All Oddities</Link>
              <br/>
              <Link to = '/Search' className='text-success'>Local Suggestions</Link>
              <div className='mb-3'/>
              <Link to = '/chat'>Chat <i className='fas fa-lock'/></Link>
            </div>
          )}
        </div>

      </div>
      <div className="mt-30"></div>
      </div>

    );
  }
}
 
export default withRouter(Header);