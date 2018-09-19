import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";


class LoginPage extends Component {

  // State
  state = {
    redirectToReferrer: false,
    title: 'Reviewer',
    subpage: 'Login Page',
    username: '',
    password: '',
    errorMsg: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // Check Passwords are the same
    // if (this.state.password === this.state.password_v){
    //   return true;
    // }
    // else{
    //   console.log(this.state.password);
    //   console.log(this.state.password_v);
    //   return false;
    // }
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    console.log(data)
  
    axios.post('/api/user/login', data)
      .then((response)=>{
      console.log(response)
      this.setState({ redirectToReferrer: true });
      })
      .catch(function(error){
      console.log(error);
      })
  }

  // Render to Screen
  render() { 
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div className = 'card mb-5'>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />

        <form className='container'>
          <p className='m-0 p-0 text-danger'>{this.state.errorMsg}</p>
          <input 
            className='m-2'
            name='username'
            placeholder='Username'
            type='text' 
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value})}
          />
          <input
            className='m-2'
            name='password'
            placeholder='Passcode'
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value})}
          />
          <br/>
          <button
            className='m-2 btn btn-info btn-small'
            onClick={this.handleSubmit}
          >
            Sign In
          </button>
        </form>

        <Footer/>
      </div>

    );
  }
}
 
export default LoginPage;