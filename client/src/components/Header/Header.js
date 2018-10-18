import React from "react";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
// import './Header.css';
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
      <div className=''>
      <div className='navMain bg-lightblue'>

        {/* Small Screen */}
        <div className='navTop-sm'>
          <div className='d-flex justify-content-between p-3'>
            <h1 className='font-marker text-white text-outline'>OddBall</h1>
            <button id='navStatusButton' onClick={this.showNavBar} className='fas fa-bars text-secondary border bg-dark border-secondary rounded'></button> 
          </div>  
        </div>

        {/* LargeScreen */}
        <div className='navTop-lg'>
          {/* <div className='container'> */}
          <div className='d-flex justify-content-between p-3'>
            <Link to='/'>
              <h1 className='font-marker text-white text-outline'>OddBall</h1>
              <p className='font-raleway font-weight-bold'>Austin Oddity Reviews</p>
            </Link>

            {/* LOGGED IN */}
            {this.state.username.length > 0 ? (
              <div className='w-300-px d-flex justify-content-between' style={{'marginTop': '40px'}}>

                <Link to='/about' className='font-poppins font-weight-bold'>About </Link>
                
                <div id='locationIcon'>
                  <Link to='/allproducts'><p className='font-poppins text-dark font-weight-bold'>Oddities</p></Link>
                  <div id='locationTab' className='d-none'>
                    <div className='nav-arrow-up-location'/>
                    <div className='bg-maroon p-3 rounded'> 
                      <Link to='/' className=' d-block font-weight-bold mb-1'>Search Locations</Link>
                      <Link to = '/allproducts' className='d-block font-weight-bold mb-1'>See All</Link>
                      <Link to = '/createnewlocation' className='d-block font-weight-bold mb-1'>Add A Location</Link>
                      <Link to = '/Search' className='font-weight-bold'>Suggestions</Link>
                    </div>
                  </div>
                </div>

                <Link to = '/chat' className='font-poppins font-weight-bold text-dark'>Chat</Link>

                <div id='accountIcon'>
                  <p className='font-poppins font-weight-bold'>My Account</p>
                  <div id='accountTab' className='d-none'>
                    <div className='nav-arrow-up-account'/>
                    <div className='bg-maroon p-3 rounded'>
                      {/* <p className='mb-0 text-success font-weight-bold'>{this.state.username}</p> */}
                      <Link to = '/profile' className='font-arial font-weight-bold d-block mb-1'>My Account</Link>
                      <Link to = '/usersearch' className='font-arial d-block font-weight-bold mb-1'>Search Users</Link>
                      <p className='font-arial text-danger font-weight-bold' onClick={this.logOut} id='logout'>Log Out</p>
                    </div>
                  </div>
                </div>

              </div>
            ):(
              // NOT LOGGED IN
              <div className='w-300-px d-flex justify-content-between' style={{'marginTop': '40px'}}> 
                  {/* <Link to = '/createnewlocation'>Post New Oddity</Link> */}
                  <Link to='/about' className='font-poppins'>About </Link>
                  <div id='locationIcon'>
                  <Link to='/allproducts'><p className='font-poppins text-dark font-weight-bold'>Oddities</p></Link>
                  <div id='locationTab' className='d-none'>
                    <div className='nav-arrow-up-location'/>
                    <div className='bg-maroon p-3 rounded'> 
                      <Link to='/' className=' d-block font-weight-bold'>Search Locations</Link>
                      <Link to = '/allproducts' className='d-block font-weight-bold'>See All</Link>
                      <Link to = '/Search' className='font-weight-bold'>Suggestions</Link>
                    </div>
                  </div>
                </div>
                  <Link to = '/CreateUser' className='font-poppins font-weight-bold text-success'>SIGN UP</Link>
                  <Link to = '/login' className='font-poppins font-weight-bold '>Log In</Link>
                </div>
            )}
            <div id='navSearchBar-lg' className={`d-none mt-3 ${this.state.searchInputClass}`}>
              <div className='d-flex justify-content-between'>
              <input 
                type="text" 
                className={`${this.state.searchInputBackgroundColor}`}
                value={this.state.searchInput}
                // onChange={e => this.setState({ searchInput: e.target.value})}
                onChange = {this.searchInput}
                placeholder="Search..." 
              />
              <i className='fas fa-search bg-white p-1 bg-light' style={{'height': '18px'}} onClick={this.searchAll}></i>
              </div>
              {/* Map AutoSearch Results */}
              <div style={{'position': 'absolute'}} className='bg-maroon'>
              {this.state.searchResults.map(result=>(
                
                <p  key={result._id} className=''>
                  <a href={`/location/${result._id}`} className='pl-1 text-white' key={result._id} style={{'lineHeight': '24px'}}>
                    {result.title}
                  </a>
                </p>
                
              ))}
              </div>
          </div>
          </div>
        </div>
      </div>











        <div style={this.state.navStyle} className='navTop-sm bg-maroon border-bottom font-poppins'>
          <div className={this.state.searchInputClass}>
            <div className=' mb-0'>
              <div className='d-flex justify-content-left'>
              <input 
                type="text" 
                className={this.state.searchInputBackgroundColor}
                value={this.state.searchInput}
                // onChange={e => this.setState({ searchInput: e.target.value})}
                onChange = {this.searchInput}
                placeholder="Search All..." 
                aria-label="SearchAll" 
                aria-describedby="button-addon2"
              />
                <button className="btn btn-outline-secondary ml-1" onClick={this.searchAll}>
                  <span className='fas fa-search bg-success text-white'>
                  </span>
                </button>
              </div>
              {/* Map AutoSearch Results */}
              {this.state.searchResults.map(result=>(
                <p  key={result._id} className=''><a href={`/location/${result._id}`} className='bg-secondary text-white' key={result._id}>{result.title}</a></p>
              ))}
            </div>
          </div>
          <br/>
          {this.state.username.length > 0 ? (
            <div className='text-light'>
              <p className = 'mb-3 text-secondary'>Welcome <b className='loggedInUN font-poppins text-success'>{this.state.username}</b> <i className='text-success fa fa-check-circle'/></p>
              <Link to = '/profile' className=' d-block font-weight-bold mb-1'>My Profile</Link>
              <Link to = '/usersearch' className=' d-block font-weight-bold mb-1'>Find Other Users</Link>
              <br/>
              <Link to = '/allproducts' className='d-block font-weight-bold mb-1'>See All</Link>
              <Link to = '/' className=' d-block font-weight-bold mb-1'>Search Locations</Link>
              <Link to = '/Search' className=' d-block font-weight-bold mb-1'>Local Suggestions</Link>
              <Link to = '/createnewlocation' className='d-block font-weight-bold mb-1'>Add A Location</Link>
              <br/>
              <Link to = '/chat' className='d-block font-weight-bold mb-1'>Chat</Link>
              <br/>
              <p className='d-block font-weight-bold mb-1 text-danger' onClick={this.logOut}>LogOut</p>
            </div>
          ):(
            <div> 
              <Link to = '/allproducts' className=' d-block font-weight-bold mb-1'>All Oddities</Link>
              <Link to = '/Search' className=' d-block font-weight-bold mb-1'>Local Suggestions</Link>
              <br/>
              <Link to = '/CreateUser' className=' d-block font-weight-bold mb-1'>Sign Up FREE</Link>
              <Link to = '/login' className=' d-block font-weight-bold mb-1'>Log In</Link>
              <Link to = '/chat' className=' d-block font-weight-bold mb-1'>Chat <i className='fas fa-lock'/></Link>
            </div>
          )}
        {/* </div> */}

      </div>
      <div className="mt-30"></div>
      </div>

    );
  }
}
 
export default withRouter(Header);