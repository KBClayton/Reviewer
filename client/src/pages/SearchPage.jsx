import React, { Component } from 'react';
// import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import DefaultRecDisplay from '../components/RecommendationDisplay/defaultRecDisplay'
import RecDisplay from '../components/RecommendationDisplay/recDisplay'
// import { BrowserRouter, Route, Link } from 'react-router-dom'

// import './main.css'
import axios from 'axios'

var moment = require('moment');
moment().format();

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
    randomTrail: {},
    obscuraImageAvailable: true,
    txAvailable: false,
    product: [],
    foodPrevent: {
      saved: false,
      title: "",
      user: "",
      date: ""
    },
    albumPrevent: {
      saved: false,
      title: "",
      user: "",
      date: ""
    },
    bookPrevent: {
      saved: false,
      title: "",
      user: "",
      date: ""
    },
    dailyPrevent: {
      saved: false,
      title: "",
      user: "",
      date: ""
    },
    obscuraPrevent: {
      saved: false,
      title: "",
      user: "",
      date: ""
    },
    trailPrevent: {
      saved: false,
      title: "",
      user: "",
      date: ""
    }
   }
  //function to set the "product" state
  setProductState = async () => {
    await axios.get("/api/product")
  .then(res => {
    let productArray = []
    for (let z=0; z<res.data.length ; z++) {
    let productObject = {
        title: res.data[z].title,
        user: res.data[z].username,
        date: moment(res.data[z].dateCreated).format("MMM Do YYYY")
        }
      productArray.push(productObject);
      }
      this.setState({product: productArray});
      console.log(this.state.product)
    });

  }
  //set new randomRestaurant
  foodRandomizer = async () => {
    await this.setProductState();
    await this.setState({randomRestaurant: this.state.restaurants[Math.floor(Math.random()*this.state.restaurants.length)]})
    for (let w=0 ; w<this.state.product.length ; w++){
      //console.log(this.state.randomRestaurant.title + " =? " + this.state.product[w].title);
      if (this.state.randomRestaurant ? this.state.randomRestaurant.title === this.state.product[w].title : 2 == 1) {
        this.setState({foodPrevent: {
          saved: true,
          title: this.state.randomRestaurant.title,
          user: this.state.product[w].user,
          date: this.state.product[w].date 
        }
        
      })
      break;
    }
      else {
        this.setState({foodPrevent: {
          saved: false,
          title: "",
          user: "",
          date: "" 
        }
      })
    }
  }
    console.log(this.state.foodPrevent);
  }
  //set new randomAlbum
  albumRandomizer = async () => {
    await this.setProductState();
    await this.setState({randomAlbum: this.state.albums[Math.floor(Math.random()*this.state.albums.length)]})
    for (let w=0 ; w<this.state.product.length ; w++){
      if (this.state.randomAlbum ? this.state.randomAlbum.title === this.state.product[w].title : 2 == 1) {
        this.setState({albumPrevent: {
          saved: true,
          title: this.state.randomAlbum.title,
          user: this.state.product[w].user,
          date: this.state.product[w].date  
        }
      })
      break;
    }
      else {
        this.setState({albumPrevent: {
          saved: false,
          title: "",
          user: "",
          date: "" 
        }
      })
    }
  }
    console.log(this.state.albumPrevent);
  }
  //set new randomBook
  bookRandomizer = async () => {
    await this.setProductState();
    await this.setState({randomBook: this.state.books[Math.floor(Math.random()*this.state.books.length)]})
    for (let w=0 ; w<this.state.product.length ; w++){
      if (this.state.randomBook ? this.state.randomBook.title === this.state.product[w].title : 2 == 1) {
        this.setState({bookPrevent: {
          saved: true,
          title: this.state.randomBook.title,
          user: this.state.product[w].user,
          date: this.state.product[w].date   
        }
      })
      break;
    }
      else {
        this.setState({bookPrevent: {
          saved: false,
          title: "",
          user: "",
          date: "" 
        }
      })
    }
  }
    console.log(this.state.bookPrevent);
  }
  //set new randomDo512events
  do512Randomizer = async () => {
    await this.setProductState();
    await this.setState({randomDo512events: this.state.do512events[Math.floor(Math.random()*this.state.do512events.length)]})
    this.state.randomDo512events ? this.state.randomDo512events.ticketLink ? this.setState({txAvailable: true}) : this.setState({txAvailable: false}) : console.log("efforting");
    for (let w=0 ; w<this.state.product.length ; w++){
      if (this.state.randomDo512events ? this.state.randomDo512events.title === this.state.product[w].title : 2 == 1) {
        this.setState({dailyPrevent: {
          saved: true,
          title: this.state.randomDo512events.title,
          user: this.state.product[w].user,
          date: this.state.product[w].date  
        }
      })
      break;
    }
      else {
        this.setState({dailyPrevent: {
          saved: false,
          title: "",
          user: "",
          date: "" 
        }
      })
    }
  }
    console.log(this.state.dailyPrevent);
  }
  //set new randomRandomObscura
  obscuraRandomizer = async () => {
    await this.setProductState();
    await this.setState({randomObscura: this.state.obscura[Math.floor(Math.random()*this.state.obscura.length)]})
    this.state.randomObscura ? this.state.randomObscura.image  == "https://via.placeholder.com/300x300" ? this.setState({obscuraImageAvailable: false}) : this.setState({obscuraImageAvailable: true}) : console.log("efforting");
    for (let w=0 ; w<this.state.product.length ; w++){
      if (this.state.randomObscura ? this.state.randomObscura.title === this.state.product[w].title : 2 == 1) {
        this.setState({obscuraPrevent: {
          saved: true,
          title: this.state.randomObscura.title,
          user: this.state.product[w].user,
          date: this.state.product[w].date  
        }
      })
      break;
    }
      else {
        this.setState({obscuraPrevent: {
          saved: false,
          title: "",
          user: "",
          date: "" 
        }
      })
    }
  }
    console.log(this.state.obscuraPrevent);
  }
  //set new randomTrail
  trailRandomizer = async () => {
    await this.setProductState();
    await this.setState({randomTrail: this.state.trails[Math.floor(Math.random()*this.state.trails.length)]})
    for (let w=0 ; w<this.state.product.length ; w++){
      if (this.state.randomTrail ? this.state.randomTrail.title === this.state.product[w].title : 2==1) {
        this.setState({trailPrevent: {
          saved: true,
          title: this.state.randomTrail.title,
          user: this.state.product[w].user,
          date: this.state.product[w].date 
        }
      })
      break;
    }
      else {
        this.setState({trailPrevent: {
          saved: false,
          title: "",
          user: "",
          date: "" 
        }
      })
    }
  }
    console.log(this.state.trailPrevent);
  }
  // Loads All Recommendations and sets the appropriate states
  loadRecommendations = async () => {
    this.setProductState();
    await axios.get("/recommend/acFood/all")
      .then(res => {
        //console.log(res.data);
        this.setState({restaurants: res.data});
        this.foodRandomizer();
        //console.log(this.state.restaurants)
      });
    await axios.get("/recommend/acMusic/all")
      .then(res => {
        //console.log(res.data);
        this.setState({albums: res.data})
        this.albumRandomizer();
        //console.log(this.state.albums)
      });
    await axios.get("/recommend/acBooks/all")
      .then(res => {
        //console.log(res.data);
        this.setState({books: res.data})
        this.bookRandomizer();
        //console.log(this.state.books)
      });
    await axios.get("/recommend/daily/all")
      .then(res => {
        //console.log(res.data);
        this.setState({do512events: res.data})
        this.do512Randomizer();
        //console.log(this.state.do512events)
      });
    await axios.get("/recommend/obscura/all")
      .then(res => {
        //console.log(res.data);
        this.setState({obscura: res.data})
        this.obscuraRandomizer();
        //console.log(this.state.obscura)
      });
    await axios.get("/recommend/trails/all")
      .then(res => {
        //console.log(res.data);
        this.setState({trails: res.data})
        this.trailRandomizer();
        //console.log(this.state.trails)
      });
    }
  //scrape restaurant recs and add new recs to the database
  foodScraper = async () => {
    document.getElementById("findFood").style.display="none";
    document.getElementById("foodDefaultMessage").innerText="Currently searching for restaurant recommendations, the page will reload automatically when recommendations are found."
    await axios.get("recommend/acFood").then(res => {
      console.log(res);
      console.log("RESTAURANT RECS UPDATED");
    }).catch(function(err) {
      // If an error occurred, log it
      console.log(err);
      });
    this.foodRandomizer();
  } 
  //scrape album recs and add new recs to the database
  albumScraper = async () => {
    document.getElementById("findAlbums").style.display="none";
    document.getElementById("musicDefaultMessage").innerText="Currently searching for album recommendations, the page will reload automatically when recommendations are found."
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
  bookScraper = async (event) => {
    event.preventDefault();
    document.getElementById("findBooks").style.display="none";
    document.getElementById("bookDefaultMessage").innerText="Currently searching for book recommendations, the page will reload automatically when recommendations are found."
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
      document.getElementById("dailyDefaultMessage").innerText="Currently searching for event recommendations, the page will reload automatically when recommendations are found."
      console.log(res);
      console.log("DAILY RECS UPDATED");
    }).catch(function(err) {
      // If an error occurred, log it
      console.log(err);
      });
      this.loadRecommendations();
  } 
  //delete all daily recs, scrape new recs and add these to the database
  do512Refresh = async (event) => {
    event.preventDefault();
    await axios.delete("recommend/daily/delete").then(async res => {
      console.log(res);
      console.log("YESTERDAY'S RECS DELETED");
      await axios.get("recommend/daily").then(res => {
        //document.getElementById("findDaily").style.display="none";
        //document.getElementById("dailyDefaultMessage").innerText="Currently searching for event recommendations, the page will reload automatically when recommendations are found."
        console.log(res);
        console.log("DAILY RECS UPDATED");
      }).catch(function(err) {
        // If an error occurred, log it
        console.log(err);
        });
    }).catch(function(err) {
      // If an error occurred, log it
      console.log(err);
      });
      this.do512Randomizer();
  } 
  //scrape obscura recs from both pages, add appropriate images and add new recs to the database
  obscuraScraper = async () => {
    document.getElementById("findObscura").style.display="none";
    document.getElementById("obscuraDefaultMessage").innerText="Currently searching for recommendations, the page will reload automatically when recommendations are found."
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
      this.obscuraRandomizer();
  }
  //scrape obscura images for current recs based on the boolean values of obscuraP1 and obscuraP2
  obscuraImager = async () => {
    console.log(this.state.randomObscura)
      await axios.get("recommend/obscura/images", {
        params: {
          title: this.state.randomObscura.title,
          link: this.state.randomObscura.link
        }
      }).then(async res => {
        console.log(res);
        console.log("OBSCURA IMAGE UPDATED");
        await axios.get("/recommend/obscura/all")
        .then(res => {
          //console.log(res.data);
          this.setState({obscura: res.data})
          console.log("db updated");
        }).catch(function(err) {
          // If an error occurred, log it
          console.log(err);
          });
        }).catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
      this.obscuraRandomizer();
    }
  //scrape trail recs and add new recs to the database
  trailScraper = async () => {
    document.getElementById("findTrails").style.display="none";
    document.getElementById("trailDefaultMessage").innerText="Currently searching for trail recommendations, the page will reload automatically when recommendations are found."
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
  //save a restaurant recommendation
  handleSubmitFood = async (event) => {
    event.preventDefault();
    //GEOCODING API CALL GOES HERE
    let addressArray = this.state.randomRestaurant.address.split(",");
    let addressHelper = addressArray.length === 1 ? this.state.randomRestaurant.address + " Austin TX" : this.state.randomRestaurant.address + " TX";
    let formattedAddress = addressHelper.split(' ').length === 3 ? "Austin+TX" : addressHelper.replace(/\./g, "").split(' ').join('+');
    let finalAddress = formattedAddress.split('+').join(' ')
    console.log(formattedAddress);
    let googleHelper = "https://maps.googleapis.com/maps/api/geocode/json?&address=" + formattedAddress + "key=AIzaSyDoQLe8s7JUbTZ_ubXhGY4cUmLiNqWvQxw"
    await axios.get(googleHelper)
      .then((googleresponse) => {
        console.log(googleresponse)
        if (googleresponse.data.results[0]){
          this.setState({gpsdata: {
            lat: googleresponse.data.results[0].geometry.location.lat,
            long: googleresponse.data.results[0].geometry.location.lng
            }      
          })
        } 
      });

    // Create newUser Post
    const newLocation = {
      title: this.state.randomRestaurant.title,
      description: this.state.randomRestaurant.description,
      picture: this.state.randomRestaurant.image,
      link: this.state.randomRestaurant.link,
      address: addressHelper.split(' ').length === 3 ? this.state.randomRestaurant.address : finalAddress,
      gpsdata: this.state.gpsdata
    }

    console.log(newLocation)
    
    axios.post('/api/product', newLocation)
      .then((response) => {
        console.log(response)
        // If Successfully Posted
        if (response.status === 200){
          //this.setState({productSuccess: 'true' });
          console.log("IF YOU CAN SEE THIS, MAKE SURE THE DATABASE IS BEING UPDATED")
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
    this.foodRandomizer();
  }
  //save an album recommendation
  handleSubmitMusic = async (event) => {
    event.preventDefault();
    // Create newUser Post
    const newLocation = {
      title: this.state.randomAlbum.location + " by " + this.state.randomAlbum.title,
      description: this.state.randomAlbum.description + "pick up a copy at " + this.state.randomAlbum.ticketlink + ".",
      picture: this.state.randomAlbum.image,
      link: this.state.randomAlbum.link,
      address: this.state.randomAlbum.address,
      gpsdata: {
        lat: this.state.randomAlbum.lat,
        long: this.state.randomAlbum.long
        }
    }

    console.log(newLocation)
    
    axios.post('/api/product', newLocation)
      .then((response) => {
        console.log(response)
        // If Successfully Posted
        if (response.status === 200){
          //this.setState({productSuccess: 'true' });
          console.log("IF YOU CAN SEE THIS, MAKE SURE THE DATABASE IS BEING UPDATED")
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
    this.albumRandomizer();
  }
  //save a book recommendation
  handleSubmitBook = async (event) => {
    event.preventDefault();
    // Create newUser Post
    const newLocation = {
      title: this.state.randomBook.title + " by " + this.state.randomBook.location,
      description: this.state.randomBook.description,
      picture: this.state.randomBook.image,
      link: this.state.randomBook.link,
      address: this.state.randomBook.address,
      gpsdata: {
        lat: this.state.randomBook.lat,
        long: this.state.randomBook.long
        }
    }

    console.log(newLocation)
    
    axios.post('/api/product', newLocation)
      .then((response) => {
        console.log(response)
        // If Successfully Posted
        if (response.status === 200){
          //this.setState({productSuccess: 'true' });
          console.log("IF YOU CAN SEE THIS, MAKE SURE THE DATABASE IS BEING UPDATED")
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
    this.bookRandomizer();
  }
  //save a book recommendation
  handleSubmitDo512 = async (event) => {
    event.preventDefault();
    // Create newUser Post
    const newLocation = {
      title: this.state.randomDo512events.title,
      description: this.state.randomDo512events.location + " at " + this.state.randomDo512events.time,
      picture: this.state.randomDo512events.image,
      link: this.state.randomDo512events.link,
      address: this.state.randomDo512events.address,
      gpsdata: {
        lat: this.state.randomDo512events.lat,
        long: this.state.randomDo512events.long
        }
    }

    console.log(newLocation)
    
    axios.post('/api/product', newLocation)
      .then((response) => {
        console.log(response)
        // If Successfully Posted
        if (response.status === 200){
          //this.setState({productSuccess: 'true' });
          console.log("IF YOU CAN SEE THIS, MAKE SURE THE DATABASE IS BEING UPDATED")
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
    this.do512Randomizer();
  }
  //save an obscura recommendation
  handleSubmitObscura = async (event) => {
    event.preventDefault();
    // Create newUser Post
    const newLocation = {
      title: this.state.randomObscura.title,
      description: this.state.randomObscura.description,
      picture: this.state.randomObscura.image,
      link: this.state.randomObscura.link,
      address: this.state.randomObscura.address.split(this.state.randomObscura.title)[1],
      gpsdata: {
        lat: this.state.randomObscura.lat,
        long: this.state.randomObscura.long
        }
    }

    console.log(newLocation)
    
    axios.post('/api/product', newLocation)
      .then((response) => {
        console.log(response)
        // If Successfully Posted
        if (response.status === 200){
          //this.setState({productSuccess: 'true' });
          console.log("IF YOU CAN SEE THIS, MAKE SURE THE DATABASE IS BEING UPDATED")
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
    this.obscuraRandomizer();
  }
  //save a trail recommendation
  handleSubmitTrail = async (event) => {
    event.preventDefault();
    //REVERSE GEOCODING GOES HERE
    let addressHelper = this.state.randomTrail.lat + "," + this.state.randomTrail.long;
    let googleHelper = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + addressHelper + "&key=AIzaSyDoQLe8s7JUbTZ_ubXhGY4cUmLiNqWvQxw";
    axios.get(googleHelper)
      .then((googleresponse) => {
        console.log(googleresponse)
        if (googleresponse.data.results[0]){
          this.setState({address: googleresponse.data.results[0].formatted_address})          
        }
      })   
    // Create newUser Post
    const newLocation = {
      title: this.state.randomTrail.title,
      description: "Located at " + this.state.randomTrail.location + ", CUSTOM DESCRIPTION",
      picture: this.state.randomTrail.image,
      link: this.state.randomTrail.link,
      address: this.state.randomTrail.address,
      gpsdata: {
        lat: this.state.randomTrail.lat,
        long: this.state.randomTrail.long
        }      
    }

    console.log(newLocation)
    
    axios.post('/api/product', newLocation)
      .then((response) => {
        console.log(response)
        // If Successfully Posted
        if (response.status === 200){
          //this.setState({productSuccess: 'true' });
          console.log("IF YOU CAN SEE THIS, MAKE SURE THE DATABASE IS BEING UPDATED")
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
    await this.setProductState()
    this.trailRandomizer();
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
          <RecDisplay
            key = { this.state.randomRestaurant._id}
            id = {this.state.randomRestaurant._id}
            link = {this.state.randomRestaurant.link}
            title = {this.state.randomRestaurant.title}
            author = {this.state.randomRestaurant.location}
            description = {this.state.randomRestaurant.description}
            urlLink = {this.state.randomRestaurant.link}
            imageURL = {this.state.randomRestaurant.image}
            imageAvailable = "none"
            address = {this.state.randomRestaurant && this.state.randomRestaurant.address ? this.state.randomRestaurant.address.split(",").length == 1 ? this.state.randomRestaurant.address + " Austin, TX" : this.state.randomRestaurant.address + ", TX" : ""}
            areYou512 = "none"
            type = "restaurant"
            addEnabled = {this.state.foodPrevent.saved === false ? "inherit" : "none"}
            addDisabled = {this.state.foodPrevent.saved === true ? "inherit" : "none"}
            userAdded = {this.state.foodPrevent.user + " on " + this.state.foodPrevent.date + "."}
            addedHelper = {this.state.foodPrevent.saved === true ? " was added by " : ""}
            titleAdded = {this.state.foodPrevent.title ? '"' + this.state.foodPrevent.title + '"' : this.state.foodPrevent.title}
            submitMe = {this.handleSubmitFood}
            refresh = {this.foodRandomizer}
          /> : 
          <DefaultRecDisplay
            type = "restaurants"
            buttonID = "findFood"
            recScraper = {this.foodScraper}
            pID = "foodDefaultMessage"
          />}
          {this.state.randomAlbum ? 
          <RecDisplay
            key = { this.state.randomAlbum._id}
            id = {this.state.randomAlbum._id}
            link = {this.state.randomAlbum.link}
            title = {this.state.randomAlbum.location}
            author = {this.state.randomAlbum.title}
            description = {this.state.randomAlbum.description}
            storePrefix = "pick up a copy at "
            store = {this.state.randomAlbum.storeName}
            storeSuffix = "."
            storeLink = {this.state.randomAlbum.ticketLink}
            imageURL = {this.state.randomAlbum.image}
            imageAvailable = "none"
            address = {this.state.randomAlbum.address ? this.state.randomAlbum.address.replace("Austin TX", "Austin, TX"): this.state.randomAlbum.address}
            areYou512 = "none"
            type = "album"
            addEnabled = {this.state.albumPrevent.saved === false ? "inherit" : "none"}
            addDisabled = {this.state.albumPrevent.saved === true ? "inherit" : "none"}
            userAdded = {this.state.albumPrevent.user + " on " + this.state.albumPrevent.date + "."}
            addedHelper = {this.state.albumPrevent.saved === true ? " was added by " : ""}
            titleAdded = {this.state.albumPrevent.title ? '"' + this.state.albumPrevent.title + '"' : this.state.albumPrevent.title}
            submitMe = {this.handleSubmitMusic}
            refresh = {this.albumRandomizer}
          /> : 
          <DefaultRecDisplay
            type = "albums"
            buttonID = "findAlbums"
            recScraper = {this.albumScraper}
            pID = "musicDefaultMessage"
          />}
          {this.state.randomBook ? 
          <RecDisplay
            key = { this.state.randomBook._id}
            id = {this.state.randomBook._id}
            link = {this.state.randomBook.link}
            title = {this.state.randomBook.title}
            author = {this.state.randomBook.location}
            description = {this.state.randomBook.description}
            storePrefix = "pick up a copy at "
            store = {this.state.randomBook.storeName}
            storeSuffix = "."
            storeLink = {this.state.randomBook.ticketLink}
            imageURL = {this.state.randomBook.image}
            imageAvailable = "none"
            address = {this.state.randomBook.address ? this.state.randomBook.address.replace("Austin TX", "Austin, TX") : this.state.randomBook.address}
            areYou512 = "none"
            type = "book"
            addEnabled = {this.state.bookPrevent.saved === false ? "inherit" : "none"}
            addDisabled = {this.state.bookPrevent.saved === true ? "inherit" : "none"}
            userAdded = {this.state.bookPrevent.user + " on " + this.state.bookPrevent.date + "."}
            addedHelper = {this.state.bookPrevent.saved === true ? " was added by " : ""}
            titleAdded = {this.state.bookPrevent.title ? '"' + this.state.bookPrevent.title + '"' : this.state.bookPrevent.title}
            submitMe = {this.handleSubmitBook}
            refresh = {this.bookRandomizer}
          /> : 
          <DefaultRecDisplay
            type = "books"
            buttonID = "findBooks"
            recScraper = {this.bookScraper}
            pID = "bookDefaultMessage"
          />}
          {this.state.randomDo512events ?
          <RecDisplay
            key = { this.state.randomDo512events._id}
            id = {this.state.randomDo512events._id}
            link = {this.state.randomDo512events.link}
            title = {this.state.randomDo512events.title}
            author = {this.state.randomDo512events.location + " at " + this.state.randomDo512events.time}
            description = "Visit the link for event details"
            storePrefix = {this.state.txAvailable === true ? " or get tickets " : "."}
            store = {this.state.txAvailable === true ? "here" : ""}
            storeLink = {this.state.randomDo512events.ticketLink}
            storeSuffix = {this.state.txAvailable === true ? "." : ""}
            imageURL = {this.state.randomDo512events.image}
            imageAvailable = "none"
            address = {this.state.randomDo512events.address ? this.state.randomDo512events.address.replace("Austin TX", "Austin, TX") : this.state.randomDo512events.address}
            areYou512 = "inherit"
            type = "event"
            addEnabled = {this.state.dailyPrevent.saved === false ? "inherit" : "none"}
            addDisabled = {this.state.dailyPrevent.saved === true ? "inherit" : "none"}
            userAdded = {this.state.dailyPrevent.user + " on " + this.state.dailyPrevent.date + "."}
            addedHelper = {this.state.dailyPrevent.saved === true ? " was added by " : ""}
            titleAdded = {this.state.dailyPrevent.title ? '"' + this.state.dailyPrevent.title + '"' : this.state.dailyPrevent.title}
            submitMe = {this.handleSubmitDo512}
            refresh = {this.do512Randomizer}
            refreshEvents = {this.do512Refresh}
          /> : 
          <DefaultRecDisplay
            type = "events"
            buttonID = "findDaily"
            recScraper = {this.dailyScraper}
            pID = "dailyDefaultMessage"
          />}
          {this.state.randomObscura ? 
          <RecDisplay
            key = { this.state.randomObscura._id}
            id = {this.state.randomObscura._id}
            link = {this.state.randomObscura.link}
            title = {this.state.randomObscura.title}
            description = {this.state.randomObscura.description}
            imageURL = {this.state.randomObscura.image}
            imageAvailable = {this.state.obscuraImageAvailable === true ? "none" : "inherit"}
            address = {this.state.randomObscura.address}
            areYou512 = "none"
            type = "weird place"
            addEnabled = {this.state.obscuraPrevent.saved === false ? "inherit" : "none"}
            addDisabled = {this.state.obscuraPrevent.saved === true ? "inherit" : "none"}
            userAdded = {this.state.obscuraPrevent.user + " on " + this.state.obscuraPrevent.date + "."}
            addedHelper = {this.state.obscuraPrevent.saved === true ? " was added by " : ""}
            titleAdded = {this.state.obscuraPrevent.title ? '"' + this.state.obscuraPrevent.title + '"' : this.state.obscuraPrevent.title}
            submitMe = {this.handleSubmitObscura}
            refresh = {this.obscuraRandomizer}
            retrieveImage = {this.obscuraImager}
          /> : 
          <DefaultRecDisplay
            type = "weird places"
            buttonID = "findObscura"
            recScraper = {this.obscuraScraper}
            pID = "obscuraDefaultMessage"
          />}
          {this.state.randomTrail ?
          <RecDisplay
            key = { this.state.randomTrail._id}
            id = {this.state.randomTrail._id}
            link = {this.state.randomTrail.link}
            title = {this.state.randomTrail.title}
            author = {"at " + this.state.randomTrail.location}
            description = {"Located at " + this.state.randomTrail.location + ", " + this.state.randomTrail.title + " " + this.state.randomTrail.description}
            imageURL = {this.state.randomTrail.image}
            imageAvailable = "none"
            address = {this.state.randomTrail.address}
            areYou512 = "none"
            type = "trail"
            addEnabled = {this.state.trailPrevent.saved === false ? "inherit" : "none"}
            addDisabled = {this.state.trailPrevent.saved === true ? "inherit" : "none"}
            userAdded = {this.state.trailPrevent.user + " on " + this.state.trailPrevent.date + "."}
            addedHelper = {this.state.trailPrevent.saved === true ? " was added by " : ""}
            titleAdded = {this.state.trailPrevent.title ? '"' + this.state.trailPrevent.title + '"' : this.state.trailPrevent.title}
            submitMe = {this.handleSubmitTrail}
            refresh = {this.trailRandomizer}
          /> : 
          <DefaultRecDisplay
            type = "trails"
            buttonID = "findTrails"
            recScraper = {this.trailScraper}
            pID = "trailDefaultMessage"
          />}
        <Footer /> 
      </div>
      
    );
  }
}
 
export default SearchPage;