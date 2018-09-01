import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
<<<<<<< HEAD
// import { BrowserRouter, Route, Link } from 'react-router-dom'
=======
import { BrowserRouter, Route, Link } from 'react-router-dom'
>>>>>>> 198893009947411b51c2b8e204e1c9c0a0e74aee

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