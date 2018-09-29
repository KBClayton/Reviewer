import React, { Component } from 'react';
// import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LocationDisplay from '../components/LocationDisplay/LocationDisplay'
// import RateProductStars from '../components/RatingStars/ratingstars'
// import LinkWrapper from '../components/LinkWrapper/LinkWrapper'
import { Link } from 'react-router-dom'

// import './main.css'
import axios from 'axios'
// import RatingStars from '../components/RatingStars/ratingstars';

class ShowAllProducts extends Component {

  // State
  state = {
    title: "Reviewer",
    subpage: 'Show All Products',
    locations: []
  }

  // Loads All Articles
  loadLocations = () => {
  axios.get("/api/productpop")
    .then(res => {
    // console.log(res.data);
      this.setState({locations: res.data})
      // console.log(this.state.locations)
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
    // console.log(this.props)
    return (
      <div>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        <div className="container">
          <div className="row">
            {this.state.locations.map(location => (
              <div key={location._id} className='col-md-6 col-lg-4'>
                <Link to={'/location/' + location._id}>
                  <LocationDisplay
                    key = { location._id}
                    id = {location._id}
                    imageUrl = {location.picture}
                    address = {location.address}
                    // link = {location.link}
                    title = {location.title}
                    description = {location.description}
                    // urlLink = {'/location/' + location._id}
                    lengthNo = {location.reviews.length}
                    Rating = {location.averageRating}
                    noOfRatings = {location.ratings.length}
                  />
                  {/* <RateProductStars/> */}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Footer 
        /> 
      </div>
      
    );
  }
}
 
export default ShowAllProducts;