import React, { Component } from 'react';
// import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import Chat from '../components/Chat'

class Chatbox extends Component {
  state = {
    title: 'Review Site',
    subpage: 'Chat'
   }
  render() {
    return (
      <div>
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        <Chat/>
        <Footer />
      </div>
    );
  }
}

export default Chatbox;