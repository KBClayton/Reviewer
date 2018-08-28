import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import CreateUserForm from '../components/CreateUserForm/createuserform';


class CreateUserPage extends Component {

  // State
  state = {
    title: 'Review Site',
    subpage: 'AboutPage'
   }

   handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target)
    console.log(data)
    debugger;

    fetch('/api/user/new', {
      method: "POST",
      body: data
    });
    // console.log(data);
   }

  // Render to Screen
  render() { 
    return (
      <div className = 'bg-dark mb-5'>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />

        <CreateUserForm 
          handleSubmit={this.handleSubmit}
        />
        <Footer
        />
      </div>

    );
  }
}
 
export default CreateUserPage;