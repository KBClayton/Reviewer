import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import axios from 'axios'

class LoginPage extends Component {

  // State
  state = {
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