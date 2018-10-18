import React, { Component } from 'react';
// import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
// import LocationDisplay from '../components/LocationDisplay/LocationDisplay'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
import ProductComment from '../components/ProductComment/productComment'
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
    text: '',
    modalTrigger: false,
    modalClass: 'd-none'
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
    event.preventDefault();
    const newReply = {
      text: this.state.text,
      parentReview: this.state.data._id
    }
    // console.log(newReply)
    axios.post('/api/reply', newReply)
      .then(res=>{
        console.log(res);
        this.setState({text: ''})
        this.modalTrigger();
        this.loadLocations();
    })


  }

  onChange = (event) => {
    this.setState({ text: event.target.value})
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
        <div className="container">
          {/* <div className="card">
            <p>Original Comment</p>
            <p><i> "{this.state.data.text}"</i></p>
          </div> */}
          <div className='card mb-2 p-1 bg-light border border-dark'>
            <p className='m-1'>Original Review by <b>{this.state.data.username}</b></p>
            <CommentDisplay 
              key = { this.state.data._id}
              id = {this.state.data._id}
              textComment = {this.state.data.text}
              // replies = {review.replies}
              // onChange={e => this.setState({ newReply: e.target.value})}
              length = {this.state.replies.length + ' Replies'}
              // ReplyTxt = 'Reply to this Review'
              CommentUser = {this.state.data.username}
              CommentDate = {moment(this.state.data.dateCreated).format("MMM Do YYYY")}
              // thumbsUp = {this.thumbsUp}
              thumbsUpAmount = {this.state.data.thumbsUp}
              thumbsDownAmount = {this.state.data.thumbsDown}
              thumbsUpIcon = 'fa fa-thumbs-up ml-1 mr-1'
              thumbsDownIcon = 'fa fa-thumbs-down ml-1'
            />  
            <div className='text-center mb-2'>
              <h5 onClick={this.modalTrigger} className=' font-poppins text-white bg-info p d-inline p-1 rounded'>
                <span>Reply </span><span className='fa fa-comment'/>
              </h5>
            </div>
                      </div>
            <div className={this.state.modalClass}>

          <ProductComment
            addComment = {this.handleSubmit}
            textComment = {this.onChange}
            CommentText = {this.state.text}
            modalTrigger = {this.modalTrigger}
          />
          </div>
          <div className="pl-3 pr-3">
            {this.state.replies.map(review => (
              <CommentDisplay
                key = {review._id}
                id = {review._id}
                textComment = {review.text}
                CommentUser = {review.username}
                CommentDate = {moment(review.dateCreated).format("MMM Do YYYY")}
                replies = {review.replies}
                onChange={e => this.setState({ newReply: e.target.value})}
                CommentType = {'Reply - ' + review.username + ' ' + moment(review.dateCreated).format("MMM Do YYYY")}
              />
            ))}
          </div>   
        </div>
        <Footer /> 

      </div>
      
    );
  }
}
 
export default ReplyPage;