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
      <div className = 'mb-5'>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        <div className="mainSearchInputDiv"/>
        <div className='container font-poppins'>
          <p className=' h6 mb-3 mt-1 border-bottom pb-3'>
            
            <span className="font-marker h1 text-lightblue text-outline">OddBall</span> is an online forum dedicated to reviewing local oddities.  Currently the app is mainly focused on locations here in Austin, Texas (Go Longhorns), but with your support and donations, we are hoping to expand to new areas.
          </p>
          <h4 className="mb-1 font-weight-bold text-lightblue ">How it Started</h4>
          <p className="mb-3">Oddball was designed and built in 2018 by Alex Bruner, Kevin Clayton, Jamie Reaves, and Ruben Ruiz as their final collaborative project for the University of Austin Coding Bootcamp.  Originally designed as a simple web forum to test out new technologies, it soon grew and evolved into a review site based around local oddities.</p>
          <h4 className="mb-1 font-weight-bold text-lightblue ">Future Ideas...</h4>
          <p className="mb-3">We have many ideas for the expansion and improvement of the site...
            <ol className='mt-1 mb-1 p font-weight-light ml-3'>
              <small>
                <li>- Global Presence (Not just Austin)</li>
                <li>- Improved Chat Features</li>
                <li>- More Powerful Admin Features</li>
                <li>- Verifying Locations</li>
                <li>- Enabling Google Ads</li>
              </small>
            </ol>
            If you have any other ideas for the site, please contact us!
          </p>
          <h4 className="mb-1 font-weight-bold text-lightblue ">Technologies Used</h4>
          <p className="mb-3">Oddball is based on a MERN (Mongo, Express.js, React, Node) Stack. Other technologies include Cheerio, Nightmare, OAuth, BCrypt, Ajax, JSON, Axios...</p>

        </div>

      </div>

    );
  }
}
 
export default AboutPage;