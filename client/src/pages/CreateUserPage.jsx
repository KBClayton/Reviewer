import React, {Component} from 'react';

import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
import ShowAllProducts from './ShowAllProductsPage';
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import CreateUserForm from '../components/CreateUserForm/createuserform';


class CreateUserPage extends Component {
  // super(props)

  // State
  state = {
    redirectToReferrer: false,
    title: 'Reviewer',
    subpage: 'Signup',
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
    accountAccepted: false,
    imageURL: '',
    picture: {}
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
      password: this.state.password.trim(),
      imageFile: this.state.picture
    }

    console.log(newUser)
    
    axios.post('/api/user/new', newUser)
      .then((response) => {
        console.log(response)

  
        // this.setState()
        if (response.data.success === true){
          //console.log(this)
          // this.setState({accountAccepted: true });
          this.setState({ redirectToReferrer: true });
          //this.props.history.push('/login')
        }
        else{
          alert(`This username or email is taken. Please try another.  May We Suggest BananaMan78!`)
        }

      })
      .catch(function(error){
        console.log(error);
      })
  }

  //Checks for Image To be real image
  checkImage =(event)=>{
    if(event.target.files[0].size > 1000000){
      alert('This image exceeds the size requirements. It must be less than 2MB')
      return false;
    }
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({imageURL: e.target.result});
      // console.log(this.state.imageURL)
    };
    reader.readAsDataURL(event.target.files[0]);
    this.setState({picture: event.target.files[0]})
  }

  redirect = (event) => {
    if (this.state.accountAccepted){
      return <Redirect to='/login'/>
    }
  }

  // Render to Screen
  render() { 
    const { from } = { from: { pathname: "/allproducts" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
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
          <input type="file" id='s3Image' onChange={this.checkImage}/>
          <img src={this.state.imageURL} alt=""/>
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