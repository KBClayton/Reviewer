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
    locations: [],
    color: []
  }

  // Loads All Articles
  loadLocations = () => {
  axios.get("/api/productpop")
    .then(res => {
    // console.log(res.data);
      this.setState({locations: res.data})
      console.log(this.state.locations)
    })
  }

  componentDidMount(){
    this.loadLocations();
  }

  starNumberRender=(stars)=>{
    const starArray=[]
      var starInt = Math.floor(stars.averageRating/1);
      var starRem = stars.averageRating%1;
       for(let i=0; i<starInt; i++){
         starArray.push (<i className='fas fa-star'/>);
       }
       if (starRem > .25){
         starArray.push(<i className='fas fa-star-half'/>)
       }
      return (
        <div className={this.starColor(stars)}>
          {starArray}
          <small className="text-dark"> ({stars.ratings.length} Ratings)</small>
        </div>
      )
  }

  starColor=(stars)=>{
    console.log(stars.averageRating)
    if (stars.averageRating >= 4){
      return('text-center text-success');
    }
    else if(stars.averageRating >= 2.5){
      return ('text-center text-warning');
    }
    else{
      return ('text-center text-danger');
    }
  }
  

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
              <div 
                key={location._id}
                className='col-sm-6 col-md-4 mb-3'
              >
                <Link to={'/location/' + location._id}>
                  <div className="shadow-box bg-white round">
                    <div
                      style={{
                        'background-image': `url(${location.picture})`,
                        'background-position': 'center',
                        'background-repeat': 'no-repeat',
                        'background-size': 'cover',
                        'opacity': '.7',
                        'height': '150px'
                      }}
                    />
                    <h6 className=' ml-2 mr-2 mb-0'>{location.title}</h6>
                    <div className={this.starColor(location)}>
                      {this.starNumberRender(location)}
                    </div>
                  </div>

                  {/* <LocationDisplay
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
                  /> */}
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