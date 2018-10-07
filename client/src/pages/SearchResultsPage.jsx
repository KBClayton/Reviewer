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

class SearchResultsPage extends Component {

  // State
  state = {
    title: "Reviewer",
    subpage: 'Show All Products',
    locations: [],
    temp: ''
  }

  // Loads All Articles
  loadLocations = () => {
    // this.setState({searchQuery: this.props.match.params.query})

        const descriptionSearch = {
          description: this.props.match.params.query
        }
        // console.log(descriptionSearch)

        axios.post( `/api/product/search/${this.props.match.params.query}`, descriptionSearch)
        .then(res => {
          // console.log(this.props.match.params.query)

          if (res.data.length === 0){
            // console.log('failed')
            this.setState({locations: []})
            this.setState({temp: this.props.match.params.query})
          }
          else{
            // console.log(res.data)
            this.setState({locations: res.data})
            this.setState({temp: this.props.match.params.query})
          }

        })

  }
  // checkLocationStatus =()=>{
  //   if (this.state.searchQuery)
  // }

  componentDidMount(){
    this.setState({temp: this.props.match.params.query})
    // console.log(this.state.temp)
    this.loadLocations();
  }

  // saveArticle = () => {
  //   axios.put('/api/savedArticles')
  // }

  // Render to Screen
  render() { 

    if (this.props.match.params.query !== this.state.temp){
      this.loadLocations();
    }
    // console.log(this)

    return (
      <div>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        {this.state.locations.length > 0 ? (
          <div>
          {this.state.locations.map(location => (
            <div key={location._id}>
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
              </Link>
            </div>
          ))}
          </div>
        ):(
          <p className='text-center text-danger'>No results Found</p>
        )
        }
        
        <Footer /> 
      </div>
      
    );
  }
}
 
export default SearchResultsPage;