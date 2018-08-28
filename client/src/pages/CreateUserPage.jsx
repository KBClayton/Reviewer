import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import CreateUserForm from '../components/CreateUserForm/createuserform';


class CreateUserPage extends Component {

  // State
  state = {
    title: 'Reviewer',
    subpage: 'Signup',
    name: '',
    email: '',
    password: '',
    password_v: '',
    errorMsg:''
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
    username: this.state.name,
    email: this.state.email,
    password: this.state.password
  }
  console.log(data)
  
  axios.post('http://localhost:3001/api/user/new', data)
    .then(function(response){
      console.log(response)
    })
    .catch(function(error){
      console.log(error);
    })
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
          <p className='m-0 p-0 text-danger'>{this.state.errorMsg}</p>
          <input 
            className='m-2'
            name='fullname'
            placeholder='Full Name'
            type='text' 
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value})}
          />
          <input
            className='m-2'
            name='email'
            placeholder='Email Address'
            type="text"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value})}
          />
          <input
            className='m-2'
            name='password'
            placeholder='Passcode'
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value})}
          />
          <input
            className='m-2'
            name='password_v'
            placeholder='Retype Passcode'
            type="password"
            value={this.state.password_v}
            onChange={e => this.setState({ password_v: e.target.value})}
          />
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
 
export default CreateUserPage;