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

class ShowOneLocation extends Component {

  // State
  state = {
    title: "Reviewer",
    subpage: 'Show All Products',
    backBtn: '/allproducts',
    locations: [],
    comments: [],
    newComment: '',
    newReply: ''
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
        console.log(this.state.comments.length)
      })
  }
      // Run loadLocations after posting *****

  componentDidMount(){
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

  onChange = (event) => {
    this.setState({ newComment: event.target.value})
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
            />
          ))}          
          {/* <AddCommentModal/> */}
          <Footer /> 

      </div>
      
    );
  }
}
 
export default ShowOneLocation;