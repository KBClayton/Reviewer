import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ChatRoom from '../components/ChatRoom/ChatRoom'
// import { BrowserRouter, Route, Link } from 'react-router-dom'

class Homepage extends Component {

  // State
  state = {
    title: 'Review Site',
    subpage: 'Homepage'
   }
  // Render to Screen
  render() { 
    return (
      <div className = 'bg-dark mb-5'>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        <Footer />
      </div>
    );
  }
}
 
export default Homepage;