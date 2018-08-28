import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
// import { BrowserRouter, Route, Link } from 'react-router-dom'

class AboutPage extends Component {

  // State
  state = {
    title: 'Review Site',
    subpage: 'AboutPage'
   }

  // Render to Screen
  render() { 
    return (
      <div className = 'bg-dark mb-5'>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        <Footer
        />
      </div>

    );
  }
}
 
export default LoginPage;