import React, { Component } from 'react';
// import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LocationDisplay from '../components/LocationDisplay/LocationDisplay'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import ProductComment from '../components/ProductComment/productComment'
import CommentDisplay from '../components/Comments/Comments'
import Replies from '../components/Replies/Replies'
import AddCommentModal from '../components/AddComment-Modal/AddComment-modal'
// import './main.css'
import axios from 'axios'
console.log(document.cookie.username)

var moment = require('moment');
moment().format();

class ShowOneLocation extends Component {

  // State
  state = {
    title: "Reviewer",
    subpage: 'Show All Products',
    backBtn: '/allproducts',
    locations: [],
    comments: [],
    newComment: '',
    newReply: '',
    rating: [],
    UserSetRating: 0,
    averageRating: 0,
    userRating: 0,
    UserSetRating: false
  }

  // Loads All Articles
  loadLocations = () => {

    const { match: { params } } = this.props;
    axios.get( `/api/product/${params._id}`)
      .then(res => {
      console.log(res.data);
      // console.log('Something Hapened')
        this.setState({locations: res.data})
        this.setState({comments: res.data.reviews})
        this.setState({rating: res.data.ratings})
        // console.log(this.state.comments.length)
        this.calculateRating();
      })
  }
      // Run loadLocations after posting *****

  componentDidMount(){
    console.log("in the didmount, username:")
    console.log(document.cookie);
    this.loadLocations();
  }

  handleSubmit = (event) => {
    const newComment = {
      text: this.state.newComment,
      parentProduct: this.state.locations._id
    }
    axios.post('/api/review', newComment)
      .then(res=>{
        console.log(res);
        this.loadLocations();
    })
  }

  calculateRating = () => {
    let temp = 0;
    let arrayLength = this.state.rating.length;
    this.state.rating.forEach((rate, index )=>{
     temp += rate.rating
    //  console.log(temp);
    })
    let average = temp/arrayLength;
    console.log(average)

    if (!average){
      this.setState({averageRating: 0})
    }

    else{
      this.setState({averageRating: average.toFixed(1)})
    }
  }

  setRating = (event) => {
    const newRating = {
      parentProduct: this.state.locations._id,
      rating: event.target.id
    }
    console.log(newRating);
    axios.post('/api/productrate', newRating)
      .then(res=>{
        console.log(res);
        this.loadLocations();
    })
  }

  onChange = (event) => {
    this.setState({ newComment: event.target.value})
  }

  thumbsUp = (event) =>{
    let thumbs = parseInt(event.target.value);
    this.setState({ userRating: thumbs });
    const ThumbsRating = {
      parentReview: event.target.id,
      rating: thumbs
    }
    axios.post('/api/reviewrate', ThumbsRating)
      .then(res=>{
        this.loadLocations();
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
          <LocationDisplay
            key = { this.state.locations._id}
            id = {this.state.locations._id}
            link = {this.state.locations.link}
            title = {this.state.locations.title}
            description = {this.state.locations.description}
            urlLink = {this.state.backBtn}
            lengthNo = {this.state.comments.length}
            SubmitHandler = {this.ratingSubmitHandler}
            setRating = {this.setRating}
            noOfRatings = {'Based on ' + this.state.rating.length + ' Ratings'}
            Rating = {'Average Rating: ' + this.state.locations.averageRating + ' Stars'}
            CommentButton = 'Back to All'
          />
          <ProductComment
            addComment = {this.handleSubmit}
            textComment = {this.onChange}
          />
          {this.state.comments.map(review => (
            <CommentDisplay
              key = {review._id}
              id = {review._id}
              textComment = {review.text}
              replies = {review.replies}
              onChange={e => this.setState({ newReply: e.target.value})}
              length = {review.replies.length + ' Replies'}
              ReplyTxt = 'Reply'
              CommentType = {review.username + " " + moment(review.dateCreated).format("MMM Do YYYY")}
              thumbsUp = {this.thumbsUp}
              thumbsUpAmount = {review.thumbsUp + ' Positive Reviews, '}
              thumbsDownAmount = {review.thumbsDown + ' Negative Reviews'}
              thumbsUpIcon = 'fa fa-thumbs-up'
              thumbsDownIcon = 'fa fa-thumbs-down'
              
            />
          ))}          
          {/* <AddCommentModal/> */}
          <Footer /> 

      </div>
      
    );
  }
}
 
export default ShowOneLocation;