import React, { Component } from 'react';
// import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import RecommendationDisplay from '../components/RecommendationDisplay/recommendationDisplay'
import DefaultRecDisplay from '../components/RecommendationDisplay/defaultRecDisplay'
import { BrowserRouter, Route, Link } from 'react-router-dom'

// import './main.css'
import axios from 'axios'

class SearchPage extends Component {

  // State
  state = {
    title: "Reviewer",
    subpage: 'SearchPage',
    restaurants: [],
    albums: [],
    books: [],
    do512events: [],
    obscura: [],
    trails: [],
    randomRestaurant: {},
    randomAlbum: {},
    randomBook: {},
    randomDo512events: {},
    randomObscura: {},
    randomTrail: {}


   }
  // Loads All Recommendations and sets the appropriate states
  loadRecommendations = () => {
    axios.get("/recommend/acFood/all")
      .then(res => {
        //console.log(res.data);
        const but = res.data
        this.setState({restaurants: res.data});
        this.setState({randomRestaurant: this.state.restaurants[Math.floor(Math.random()*this.state.restaurants.length)]})
        console.log(this.state.randomRestaurant);
        //console.log(this.state.restaurants)
      });
      axios.get("/recommend/acMusic/all")
      .then(res => {
        //console.log(res.data);
        this.setState({albums: res.data})
        this.setState({randomAlbum: this.state.albums[Math.floor(Math.random()*this.state.albums.length)]})
        console.log(this.state.randomAlbum);
        //console.log(this.state.albums)
      });
      axios.get("/recommend/acBooks/all")
      .then(res => {
        //console.log(res.data);
        this.setState({books: res.data})
        this.setState({randomBook: this.state.books[Math.floor(Math.random()*this.state.books.length)]})
        console.log(this.state.randomBook);
        //console.log(this.state.books)
      });
      axios.get("/recommend/daily/all")
      .then(res => {
        //console.log(res.data);
        this.setState({do512events: res.data})
        this.setState({randomDo512events: this.state.do512events[Math.floor(Math.random()*this.state.do512events.length)]})
        console.log(this.state.randomDo512events);
        //console.log(this.state.do512events)
      });
      axios.get("/recommend/obscura/all")
      .then(res => {
        //console.log(res.data);
        this.setState({obscura: res.data})
        this.setState({randomObscura: this.state.obscura[Math.floor(Math.random()*this.state.obscura.length)]})
        console.log(this.state.randomObscura);
        //console.log(this.state.obscura)
      });
      axios.get("/recommend/trails/all")
      .then(res => {
        //console.log(res.data);
        this.setState({trails: res.data})
        this.setState({randomTrail: this.state.trails[Math.floor(Math.random()*this.state.trails.length)]})
        console.log(this.state.randomTrail);
        //console.log(this.state.trails)
      });
    }
  //scrape restaurant recs and add new recs to the database
  foodScraper = async () => {
    document.getElementById("findFood").style.display="none";
    document.getElementById("defaultCardText").innerText="Currently searching for restaurant recommendations, the page will reload automatically when recommendations are found."
    await axios.get("recommend/acFood").then(res => {
      console.log(res);
      console.log("RESTAURANT RECS UPDATED");
    }).catch(function(err) {
      // If an error occurred, log it
      console.log(err);
      });
    this.loadRecommendations();
  } 
  //scrape album recs and add new recs to the database
  albumScraper = async () => {
    document.getElementById("findAlbums").style.display="none";
    document.getElementById("defaultCardText").innerText="Currently searching for album recommendations, the page will reload automatically when recommendations are found."
    await axios.get("recommend/acMusic").then(res => {
      console.log(res);
      console.log("ALBUM RECS UPDATED");
    }).catch(function(err) {
      // If an error occurred, log it
      console.log(err);
      });
      this.loadRecommendations();
  } 
  //scrape book recs and add new recs to the database
  bookScraper = async () => {
    document.getElementById("findBooks").style.display="none";
    document.getElementById("defaultCardText").innerText="Currently searching for book recommendations, the page will reload automatically when recommendations are found."
    await axios.get("recommend/acBooks").then(res => {
      console.log(res);
      console.log("BOOK RECS UPDATED");
    }).catch(function(err) {
      // If an error occurred, log it
      console.log(err);
      });
      this.loadRecommendations();
  } 
  //scrape daily recs and add them to the database
  dailyScraper = async () => {
    await axios.get("recommend/daily").then(res => {
      document.getElementById("findDaily").style.display="none";
      document.getElementById("defaultCardText").innerText="Currently searching for event recommendations, the page will reload automatically when recommendations are found."
      console.log(res);
      console.log("DAILY RECS UPDATED");
    }).catch(function(err) {
      // If an error occurred, log it
      console.log(err);
      });
      this.loadRecommendations();
  } 
  //scrape obscura recs from both pages, add appropriate images and add new recs to the database
  obscuraScraper = async () => {
    document.getElementById("findObscura").style.display="none";
    document.getElementById("defaultCardText").innerText="Currently searching for recommendations, the page will reload automatically when recommendations are found."
    await axios.get("recommend/obscuraP1").then(async res1 => {
      console.log(res1);
      console.log("OBSCURA STEP 1 COMPLETE");
      await axios.get("recommend/obscuraP2").then(async res2 => {
        console.log(res2);
        console.log("OBSCURA STEP 2 COMPLETE...OBSCURA RECS UPDATED");
      }).catch(function(err) {
        //if error, log error
        console.log(err);
      });
    }).catch(function(err) {
      // If an error occurred, log it
      console.log(err);
      });
      this.loadRecommendations();
  }
  //scrape trail recs and add new recs to the database
  trailScraper = async () => {
    document.getElementById("findTrails").style.display="none";
    document.getElementById("defaultCardText").innerText="Currently searching for trail recommendations, the page will reload automatically when recommendations are found."
    await axios.get("recommend/trails").then(res => {
      console.log(res);
      console.log("TRAIL RECS UPDATED");
    }).catch(function(err) {
      // If an error occurred, log it
      console.log(err);
      });
      this.loadRecommendations();
  }  
    componentDidMount(){
      this.loadRecommendations()
    }
  // Handle Form Submit
  handleFoodSubmit = (event) => {
    event.preventDefault();

    // Create newUser Post
    const newLocation = {
      title: this.state.randomRestaurant.title,
      description: this.state.randomRestaurant.description,
      picture: this.state.picture,
      link: this.state.randomRestaurant.image,
      address: this.state.randomRestaurant.address,
      //GOOGLE GEOCODING!!!!gpsdata: this.state.gpsdata
    }

    console.log(newLocation)
    
    axios.post('/api/product', newLocation)
      .then((response) => {
        console.log(response)
        // If Successfully Posted
        if (response.status === 200){
          this.setState({productSuccess: 'true' });
          // this.props.history.push('/home')
        }
        // If Unsuccessful
        else{
          alert(`Product Error`)
        }

      })
      .catch(function(error){
        console.log(error);
      })
  }

  // Render to Screen
  render() { 
    return (
      <div>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
          {this.state.randomRestaurant ? 
          <RecommendationDisplay
            key = { this.state.randomRestaurant._id}
            id = {this.state.randomRestaurant._id}
            link = {this.state.randomRestaurant.link}
            title = {this.state.randomRestaurant.title}
            description = {this.state.randomRestaurant.description}
            urlLink = {this.state.randomRestaurant.link}
            imageLink = {this.state.randomRestaurant.image}
            address = {this.state.randomRestaurant.address}
            type = "restaurant" 
            submitMe = {this.handleFoodSubmit}
          /> : 
          <DefaultRecDisplay
            type = "restaurants"
            buttonID = "findFood"
            recScraper = {this.foodScraper}
          />}
          {this.state.randomAlbum ? 
          <RecommendationDisplay
            key = { this.state.randomAlbum._id}
            id = {this.state.randomAlbum._id}
            link = {this.state.randomAlbum.link}
            title = {this.state.randomAlbum.title}
            description = {this.state.randomAlbum.description}
            urlLink = {this.state.randomAlbum.link}
            imageLink = {this.state.randomAlbum.image}
            address = {this.state.randomAlbum.address}
            type = "album"
          /> : 
          <DefaultRecDisplay
            type = "albums"
            buttonID = "findAlbums"
            recScraper = {this.albumScraper}
          />}
          {this.state.randomBook ? 
          <RecommendationDisplay
            key = { this.state.randomBook._id}
            id = {this.state.randomBook._id}
            link = {this.state.randomBook.link}
            title = {this.state.randomBook.title}
            description = {this.state.randomBook.description}
            urlLink = {this.state.randomBook.link}
            imageLink = {this.state.randomBook.image}
            address = {this.state.randomBook.address}
            type = "book"
          /> : 
          <DefaultRecDisplay
            type = "books"
            buttonID = "findBooks"
            recScraper = {this.bookScraper}
          />}
          {this.state.randomDo512events ?
          <RecommendationDisplay
            key = { this.state.randomDo512events._id}
            id = {this.state.randomDo512events._id}
            link = {this.state.randomDo512events.link}
            title = {this.state.randomDo512events.title}
            description = {this.state.randomDo512events.description}
            urlLink = {this.state.randomDo512events.link}
            imageLink = {this.state.randomDo512events.image}
            address = {this.state.randomDo512events.address}
            type = "event"
          /> : 
          <DefaultRecDisplay
            type = "events"
            buttonID = "findDaily"
            recScraper = {this.dailyScraper}
          />}
          {this.state.randomObscura ? 
          <RecommendationDisplay
            key = { this.state.randomObscura._id}
            id = {this.state.randomObscura._id}
            link = {this.state.randomObscura.link}
            title = {this.state.randomObscura.title}
            description = {this.state.randomObscura.description}
            urlLink = {this.state.randomObscura.link}
            imageLink = {this.state.randomObscura.image}
            address = {this.state.randomObscura.address}
            type = "weird place"
          /> : 
          <DefaultRecDisplay
            type = "weird places"
            buttonID = "findObscura"
            recScraper = {this.obscuraScraper}
          />}
          {this.state.randomTrail ?
          <RecommendationDisplay
            key = { this.state.randomTrail._id}
            id = {this.state.randomTrail._id}
            link = {this.state.randomTrail.link}
            title = {this.state.randomTrail.title}
            description = {this.state.randomTrail.description}
            urlLink = {this.state.randomTrail.link}
            imageLink = {this.state.randomTrail.image}
            address = {this.state.randomTrail.address}
            type = "trail"
          /> : 
          <DefaultRecDisplay
            type = "trails"
            buttonID = "findTrails"
            recScraper = {this.trailScraper}
          />}
        <Footer /> 
      </div>
      
    );
  }
}
 
export default SearchPage;