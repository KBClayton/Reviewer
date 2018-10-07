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
    nameCheck: false,
    emailCheck: false,
    passwordCheck: false,
    password_vCheck: false,
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

  //Checks Username
  nameVerify=async(event)=>{
    await this.setState({name: event.target.value})
    if (this.state.name.length < 5){
      this.setState({nameCheck: false})
      return false;
    }
    // axios.post(`/api/user/userview/`, {username: this.state.name})
    //   .then(res => {

    //   if (res.data.length > 0){
    //     this.setState({nameCheck: false})
    //     this.setState({usernameError: 'This Username is taken'})
    //     return false;
    //   }
    //   else{
        // const tempArray = res.data.slice(0,9)
        this.setState({nameCheck: true})
    //   }
    // })
  }
  // Checks Email 
  emailVerify = async(event)=>{
    await this.setState({email: event.target.value})
    const regexEmail = /^([A-Za-z0-9_\-\.+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/;
    if (!regexEmail.test(this.state.email)){
      this.setState({emailCheck: false})
      return false;
    }
    this.setState({emailCheck: true})
  }
  // Checks Password Strength
  passwordVerify =async(event)=>{
    await this.setState({password: event.target.value})
    const regexPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
    if (!regexPassword.test(this.state.password.trim())){
      this.setState({passwordCheck: false})
      this.setState({password_vCheck: false})
    	return false;
    }
    if (this.state.password !== this.state.password_v){
      this.setState({password_vCheck: false})
    }
    if (this.state.password === this.state.password_v){
      this.setState({password_vCheck: true})
    }
    this.setState({passwordCheck: true})
  }
  passwordMatchVerify =async(event)=>{
    await this.setState({password_v: event.target.value})
    if (this.state.password !== this.state.password_v){
      this.setState({password_vCheck: false})
      return false;
    }
    if (!this.state.passwordCheck){
      this.setState({password_vCheck: false})
      return false;     
    }
    this.setState({password_vCheck: true})
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

  loadImageInput =()=>{
    document.getElementById('s3Image').click();
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

        <form className='container text-center'>

          {/* Username */}
          <p className='m-0 p-0 text-danger'>{this.state.errorMsg.usernameError}</p>
          <input 
            className='m-2 animated bounce'
            name='fullname'
            placeholder='Full Name'
            type='text' 
            value={this.state.name}
            onChange={this.nameVerify}
          />
          {this.state.nameCheck === true ?
            (
              <span className='fas fa-check-circle text-success'/>
            ):(
              <span className='fas fa-times text-danger'/>
            )
          }

          {/* Email */}
          <p className='m-0 p-0 text-danger'>{this.state.errorMsg.emailError}</p>
          <input
            className='m-2'
            name='email'
            placeholder='Email Address'
            type="text"
            value={this.state.email}
            onChange={this.emailVerify}
          />
          {this.state.emailCheck ?
            (
              <span className='fas fa-check-circle text-success'/>
            ):(
              <span className='fas fa-times text-danger'/>
            )
          }

          {/* Password */}
          <p className='m-0 p-0 text-danger'>{this.state.errorMsg.passwordTooShortError}</p>
          <input
            className='m-2'
            name='password'
            placeholder='Passcode'
            type="password"
            value={this.state.password}
            onChange={this.passwordVerify}
          />
          {this.state.passwordCheck ?
            (
              <span className='fas fa-check-circle text-success'/>
            ):(
              <span className='fas fa-times text-danger'/>
            )
          }
          {/* Password Verification */}
          <p className='m-0 p-0 text-danger'>{this.state.errorMsg.passwordDoesntMatchError}</p>
          <input
            className='m-2'
            name='password_v'
            placeholder='Retype Passcode'
            type="password"
            value={this.state.password_v}
            onChange={this.passwordMatchVerify}
          />
          {this.state.password_vCheck ?
            (
              <span className='fas fa-check-circle text-success'/>
            ):(
              <span className='fas fa-times text-danger'/>
            )
          }
          <br/>
          <input type="file" id='s3Image' style={{display: 'none'}} onChange={this.checkImage}/>
          <span onClick={this.loadImageInput} className='btn btn-info m-2'>Add Image</span> <img src={this.state.imageURL} alt="" className='img-logo'/>
          <br/>
          <button
            className='m-2 btn btn-success btn-small'
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