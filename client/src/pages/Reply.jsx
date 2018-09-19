import React, { Component } from 'react';
// import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
// import LocationDisplay from '../components/LocationDisplay/LocationDisplay'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import ProductComment from '../components/ProductComment/productComment'
import CommentDisplay from '../components/Comments/Comments'
// import Replies from '../components/Replies/Replies'
// import AddCommentModal from '../components/AddComment-Modal/AddComment-modal'

// import './main.css'
import axios from 'axios'

var moment = require('moment');
moment().format();

class ReplyPage extends Component {

  // State
  state = {
    title: "Reviewer",
    subpage: 'Add Reply',
    data: {},
    replies: [],
    text: ''
  }

  // Loads All Articles
  loadLocations = () => {

    const { match: { params } } = this.props;
    axios.get( `/api/review/${params._id}`)
      .then(res => {
      // console.log(res.data);
      // console.log('Something Hapened')
        this.setState({data: res.data})
        this.setState({replies: res.data.replies})
        // console.log(this.state.data.replies)
      })
  }
      // Run loadLocations after posting *****

  componentDidMount(){
    this.loadLocations();
  }

  handleSubmit = (event) => {
    const newReply = {
      text: this.state.text,
      parentReview: this.state.data._id
    }
    // console.log(newReply)
    axios.post('/api/reply', newReply)
      .then(res=>{
        console.log(res);
        this.loadLocations();
    })


  }

  onChange = (event) => {
    this.setState({ text: event.target.value})
  }

  // Render to Screen
  render() { 
    return (
      <div>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        <div className="card">
          <p>Original Comment</p>
          <p><i> "{this.state.data.text}"</i></p>
        </div>

        <input className = 'border border-dark m-3' type="text" onChange={this.onChange} name = 'replyText'/>
        <button className="btn btn-info" onClick={this.handleSubmit} type='submit'>Send your reply</button>
          {this.state.replies.map(review => (
            <CommentDisplay
              key = {review._id}
              id = {review._id}
              textComment = {review.text}
              replies = {review.replies}
              onChange={e => this.setState({ newReply: e.target.value})}
              CommentType = {'Reply - ' + review.username + ' ' + moment(review.dateCreated).format("MMM Do YYYY")}

            />
          ))}   

        <Footer /> 

      </div>
      
    );
  }
}
 
export default ReplyPage;