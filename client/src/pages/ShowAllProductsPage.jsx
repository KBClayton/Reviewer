import React, { Component } from 'react';
// import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LocationDisplay from '../components/LocationDisplay/LocationDisplay'

import { BrowserRouter, Route, Link } from 'react-router-dom'

// import './main.css'
import axios from 'axios'

class ShowAllProducts extends Component {

  // State
  state = {
    title: "Reviewer",
    subpage: 'Show All Products',
    locations: []
  }

  // Loads All Articles
  loadLocations = () => {
  axios.get("/api/product")
    .then(res => {
    // console.log(res.data);
      this.setState({locations: res.data})
      console.log(this.state.locations)
    })
  }

  componentDidMount(){
    this.loadLocations();
  }

  // saveArticle = () => {
  //   axios.put('/api/savedArticles')
  // }

  // Render to Screen
  render() { 
    return (
      <div>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        {this.state.locations.map(location => (
          <LocationDisplay
            key = { location._id}
            id = {location._id}
            link = {location.link}
            title = {location.title}
            description = {location.description}
            urlLink = {'/location/' + location._id}
            lengthNo = {location.reviews.length}
            // Rating ={ location.rating.average}
            noOfRatings = {location.ratings.length + ' Ratings'}
            CommentButton = 'See Comments'
          />
        ))}
        <Footer /> 
      </div>
      
    );
  }
}
 
export default ShowAllProducts;