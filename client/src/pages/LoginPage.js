import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
import {
  Redirect
} from "react-router-dom";


class LoginPage extends Component {

  // State
  state = {
    redirectToReferrer: false,
    title: 'Reviewer',
    subpage: 'Login Page',
    username: '',
    password: '',
    errorMsg: '',
    resetemail:'',
    resetmessage:''
  }
  loadLocations = () => {

    const { match: { params } } = this.props;
    if(params.name && params.emailver){
    axios.get( `/api/user/resetreq/${params.name}/${params.emailver}`)
      .then(res => {
      // console.log(res.data);
      // console.log('Something Hapened')
        this.setState({resetmessage: res.data.message})
        // console.log(this.state.data.replies)
      })
    }
  }
      // Run loadLocations after posting *****

  componentDidMount(){
    this.loadLocations();
  }

  reset = (event)=>{
    event.preventDefault();
    let resetthing={
      email:this.state.resetemail
    }
    //console.log(resetthing)
    axios.post('/api/user/reset', resetthing).then((response)=>{
      console.log(response)
      this.setState({resetmessage:response.data.message})
    }).catch(function(error){
      console.log(error);
      })
    
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
      <div>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />

        <form className='container bg-info'>
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
        <form className='container bg-info'>
        <br/>
        <br/>
        <p className='m-0 p-0 text-danger'>{this.state.resetmessage}</p>
        <input 
            className='m-2'
            name='resetemail'
            placeholder='Reset my password'
            type='text' 
            value={this.state.resetemail}
            onChange={e => this.setState({ resetemail: e.target.value})}
          />
          <br/>
          <button
            className='m-2 btn btn-info btn-small'
            onClick={this.reset}
          >
            Reset my password
          </button>
        </form>

        <Footer/>
      </div>

    );
  }
}
 
export default LoginPage;