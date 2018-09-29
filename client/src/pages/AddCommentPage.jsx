import React, { Component } from 'react';
// import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LocationDisplay from '../components/LocationDisplay/LocationDisplay'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import ProductComment from '../components/ProductComment/productComment'
import CommentDisplay from '../components/Comments/Comments'
// import Replies from '../components/Replies/Replies'
import RateProductStars from '../components/RatingStars/ratingstars'
// import AddCommentModal from '../components/AddComment-Modal/AddComment-modal'
// import './main.css'
import axios from 'axios'
// console.log(document.cookie.username)

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
    myRatings: [],
    myPreviousRating: '',
    alreadyReviewed: false,
    UserSetRating: 0,
    averageRating: 0,
    userRating: 0,
    modalTrigger: false,
    modalClass: 'd-none'
  }

  // Loads All Articles
  loadLocations = () => {

    const { match: { params } } = this.props;
    axios.get( `/api/product/${params._id}`)
      .then(res => {
      // console.log(res.data);
      // console.log('Something Hapened')
        this.setState({locations: res.data})
        this.setState({comments: res.data.reviews})
        this.setState({rating: res.data.ratings})
        
        // console.log(this.state.comments.length)
        this.calculateRating();
        this.loadProfile();
      })
  }

  loadProfile = () => {
    axios.get( `/api/user/allstuff`)
      .then(res => {
        console.log(res.data.productRatings)
        this.setState({myRatings: res.data.productRatings})
        this.checkForPreviousRating();
    })
  }

  checkForPreviousRating =()=>{
    for (let i=0; i<this.state.myRatings.length; i++){
      if (this.state.myRatings[i].parentProduct === this.props.match.params._id){
        this.setState({alreadyReviewed: true})
        this.setState({myPreviousRating: this.state.myRatings[i].rating})
      }
    }
  }

  componentDidMount(){
    // console.log("in the didmount, username:")
    // console.log(document.cookie);
    this.loadLocations();
    this.loadProfile();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      text: this.state.newComment,
      parentProduct: this.state.locations._id
    }
      this.setState({newComment: ''})
    axios.post('/api/review', newComment)
      .then(res=>{
        // console.log(this.state.newComment);
        this.modalTrigger();
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
    // console.log(average)

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
    // console.log(newRating);
    axios.post('/api/productrate', newRating)
      .then(res=>{
        // console.log(res);
        this.loadLocations();
    })
  }

  onChange = (event) => {
    this.setState({ newComment: event.target.value})
  }

  thumbsUp = (event) =>{
    let thumbs = parseInt(event.target.getAttribute('value'));
    this.setState({ userRating: thumbs });
    const ThumbsRating = {
      parentReview: event.target.id,
      rating: thumbs
    }
    // console.log(ThumbsRating)

    axios.post('/api/reviewrate', ThumbsRating)
      .then(res=>{
        this.loadLocations();
      })
  }
  modalTrigger = ()=>{
    if (this.state.modalTrigger === false){
      this.setState({modalTrigger: true})
      this.setState({modalClass: ''})
      console.log('open modal')
      return;
    }
    else {
      this.setState({modalTrigger: false})
      console.log('close modal')
      this.setState({modalClass: 'd-none'})
      return;
    }
  }

  // Render to Screen
  render() { 
    return (
      <div>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        {this.state.alreadyReviewed === false ? (
          <RateProductStars 
            setRating = {this.setRating}
          />
        ):(
          <p className='text-center text-danger'>You Rated This <b className='text-dark'>{this.state.myPreviousRating}</b> Stars!</p>
        )}
          <div className="container">
          <LocationDisplay
            key = { this.state.locations._id}
            id = {this.state.locations._id}
            link = {this.state.locations.link}
            title = {this.state.locations.title}
            imageUrl = {this.state.locations.picture}
            description = {this.state.locations.description}
            urlLink = {this.state.backBtn}
            lengthNo = {this.state.comments.length}
            SubmitHandler = {this.ratingSubmitHandler}
            setRating = {this.setRating}
            noOfRatings = {this.state.rating.length}
            Rating = {this.state.locations.averageRating}
            address = {this.state.locations.address}
            modalTrigger = {this.modalTrigger}
          />
          <div className={this.state.modalClass}>
            <ProductComment
              addComment = {this.handleSubmit}
              textComment = {this.onChange}
              CommentText = {this.state.newComment}
              modalTrigger = {this.modalTrigger}
            />
          </div>
          {this.state.comments.map(review => (
            <CommentDisplay
              key = {review._id}
              id = {review._id}
              textComment = {review.text}
              replies = {review.replies}
              onChange={e => this.setState({ newReply: e.target.value})}
              length = {review.replies.length + ' Replies'}
              ReplyTxt = 'Reply to this Review'
              CommentUser = {review.username}
              CommentDate = {moment(review.dateCreated).format("MMM Do YYYY")}
              thumbsUp = {this.thumbsUp}
              thumbsUpAmount = {review.thumbsUp}
              thumbsDownAmount = {review.thumbsDown}
              thumbsUpIcon = 'fa fa-thumbs-up ml-1 mr-1'
              thumbsDownIcon = 'fa fa-thumbs-down ml-1'
            />
          ))}
          </div>          
          {/* <AddCommentModal/> */}
          <Footer /> 

      </div>
      
    );
  }
}
 
export default ShowOneLocation;