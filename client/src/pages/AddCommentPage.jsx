import React, { Component } from 'react';
// import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LocationDisplay from '../components/LocationDisplay/LocationDisplay'
import { BrowserRouter, Route, Link } from 'react-router-dom'

// import './main.css'
import axios from 'axios'

class ShowOneLocation extends Component {

  // State
  state = {
    title: "Reviewer",
    subpage: 'Show All Products',
    backBtn: '/allproducts',
    locations: []
   }
  
  // Loads All Articles
  loadLocations = () => {

    const { match: { params } } = this.props;
    axios.get( `/api/product/${params._id}`)
      .then(res => {
      // console.log(res.data);
      console.log('Something Hapened')
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
          <LocationDisplay
            key = { this.state.locations._id}
            id = {this.state.locations._id}
            link = {this.state.locations.link}
            title = {this.state.locations.title}
            description = {this.state.locations.description}
            urlLink = {this.state.backBtn}
          />
        <Footer /> 
      </div>
      
    );
  }
}
 
export default ShowOneLocation;