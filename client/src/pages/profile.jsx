import React, {Component} from 'react';

import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import CreateUserForm from '../components/CreateUserForm/createuserform';


class UserProfilePage extends Component {
  // super(props)

  // State
  state = {
    title: 'Reviewer',
    subpage: 'Profile',
    name: '',
    email: '',
    password: '',
    password_v: '',
    errorMsg: {
      emailError: '',
      usernameError: '',
      passwordTooShortError: '',
      passwordDoesntMatchError: ''
    },
    accountAccepted: false
   }

  // Handle Form Submit
  handleSubmit = (event) => {
    event.preventDefault();

    // UserName length validation
    if (this.state.name.trim().length < 5){
      this.setState({errorMsg: {usernameError: 'Username must be 5 or more characters'}})
      return false;
    }

    //Email Regex Validation
    const regexEmail = /^([A-Za-z0-9_\-\.+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/;
    if (!regexEmail.test(this.state.email)){
      this.setState({errorMsg: {emailError: 'Email is not valid'}})
      return false;
    }

    // Password Complexity Verification
    var regexPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
    if (!regexPassword.test(this.state.password.trim())){
    	this.setState({errorMsg: {passwordTooShortError: 'Password needs to contain: 8+ characters, 1+ uppercase letter, 1+ numbers and at least one symbol'}})
    	return false;
    }

    //Password Matches Verification
    if (this.state.password !== this.state.password_v){
      this.setState({errorMsg: {passwordDoesntMatchError: 'Passwords Do Not Match'}})
      return false;
    }

    // Create newUser Post
    const newUser = {
      username: this.state.name.trim(),
      email: this.state.email.trim(),
      password: this.state.password.trim()
    }

    console.log(newUser)
    
    axios.post('/api/user/new', newUser)
      .then((response) => {
        console.log(response)
        // this.setState()
        if (response.data.success === true){
          console.log(this)
          // this.setState({accountAccepted: true });
          this.props.history.push('/login')
        }
        else{
          alert(`This username or email is taken. Please try another.  May We Suggest BananaMan78!`)
        }

      })
      .catch(function(error){
        console.log(error);
      })
  }

  redirect = (event) => {
    if (this.state.accountAccepted){
      return <Redirect to='/login'/>
    }
  }

  // Render to Screen
  render() { 
    return (
      <div className = 'bg-dark mb-5'>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />

        <form className='container'>

          <p className='m-0 p-0 text-danger'>{this.state.errorMsg.usernameError}</p>
          <input 
            className='m-2 animated bounce'
            name='fullname'
            placeholder='Full Name'
            type='text' 
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value})}
          />
          <p className='m-0 p-0 text-danger'>{this.state.errorMsg.emailError}</p>
          <input
            className='m-2'
            name='email'
            placeholder='Email Address'
            type="text"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value})}
          />
          <p className='m-0 p-0 text-danger'>{this.state.errorMsg.passwordTooShortError}</p>
          <input
            className='m-2'
            name='password'
            placeholder='Passcode'
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value})}
          />
          <p className='m-0 p-0 text-danger'>{this.state.errorMsg.passwordDoesntMatchError}</p>
          <input
            className='m-2'
            name='password_v'
            placeholder='Retype Passcode'
            type="password"
            value={this.state.password_v}
            onChange={e => this.setState({ password_v: e.target.value})}
          />
          <input type="file"/>
          <br/>
          <button
            className='m-2 btn btn-info btn-small'
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>

        <Footer/>
      </div>

    );
  }
}
 
export default withRouter(CreateUserPage);