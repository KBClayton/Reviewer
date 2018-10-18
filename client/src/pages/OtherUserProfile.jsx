import React, {Component} from 'react';

import { Redirect, withRouter, Link } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LocationDisplay from '../components/LocationDisplay/LocationDisplay'
import axios from 'axios'
import CommentDisplay from '../components/Comments/Comments'
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import CreateUserForm from '../components/CreateUserForm/createuserform';
var moment = require('moment');
moment().format();

class OtherProfilePage extends Component {
  // super(props)
// State
state = {
    // big:{},
    // username: '',
    // password_o:'',
    // password_v:'',
    // password:'',
    // title:'',
    // email: '',
    // emailVerified: false,
    // productRating:[],
    // locations:[],
    // comments:[],
    // replies:[],
    // reviews:[],
    // ratings:[],
    // avgProdRate:0,
    // revUp:0,
    // revDown:0
    searchInput: '',
    searchresultsArray: [],
    UserInfo: []
   }

 //get the user's data
 searchProfiles = () => {
  if (this.state.searchInput.length > 0){
    const userSearch ={
      username: this.state.searchInput,
      pageNumber: 0
    }
    // console.log(userSearch)
    axios.post(`/api/user/userfind`, {username: this.state.searchInput})
      .then(res => {
      if (res.data.length === 1){

        axios.post(` /api/user/userview/`, {username: res.data[0].username})
          .then(response => {
            console.log(response.data)
          this.setState({UserInfo: response.data})
          // this.setState({searchInput: ''})
          this.setState({searchresultsArray: []})
        })
      }
      else if (res.data.length === 0){
        this.setState({searchresultsArray: [{username: 'There are no results'}]})
      }
      else{
        this.setState({searchresultsArray: res.data})
        this.setState({UserInfo: ''})
      }
    })
  }
    else{
      this.setState({searchresultsArray: []})
    }
  }

  viewProfiles = (event) => {
    event.persist();
    //  console.log(event.target.id)
      axios.post(` /api/user/userview/`, {username: event.target.id})
        .then(res => {
          // console.log(res.data)
        this.setState({UserInfo: res.data})
        this.setState({searchInput: ''})
        this.setState({searchresultsArray: []})
      })
    }
  
    searchInput =async (event)=>{
      await this.setState({searchInput: event.target.value})
      // if (this.state.searchInput.length > 0){
      //   return;
      // }
      this.searchProfiles();
    }



  // redirect = (event) => {
  //   if (this.state.accountAccepted){
  //     return <Redirect to='/login'/>
  //   }
  // }

  // Render to Screen
  render() { 
    return (
      <div className = 'bg-light mb-5'>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        <div className="mainSearchInputDiv">
          <input type="text" value={this.state.searchInput} onChange={this.searchInput} placeholder='Search All Users...'/>        
        </div>
        
        {/* If multiple results */}
        <div className='container mb-3'>
          <p className="mt-1 mb-1 h4 font-poppins border-bottom">{this.state.searchresultsArray.length} Results Found</p>
          {this.state.searchresultsArray.map(result =>(
              <span  
                key={result._id} 
                id={result.username} 
                onClick ={this.viewProfiles}
                className='m-1 h4 bg-white p-1 text-info font-slabo searchUserResult float-left'
              >
                {result.username}
              </span>
          ))}
        </div>
        {/* If 1 result */}
        {this.state.UserInfo.username ? 
        (
          <div className='container mb-3' key={this.state.UserInfo.username}>
          <div className="">
            <h3>{this.state.UserInfo.username}</h3>
            <img src={this.state.UserInfo.picture}/>
            <p className='mb-0'>{this.state.UserInfo.products.length}  Posts</p>
            <p className='mb-0'>{this.state.UserInfo.reviewRatings.length} Review Ratings</p>
            <p className='mb-0'>{this.state.UserInfo.reviews.length}  Reviews</p>
            <p className='mb-0'>{this.state.UserInfo.replies.length}  Replies</p>
            <p className='mb-0'>{this.state.UserInfo.productRatings.length}  Product Ratings</p>
            </div>
          </div>
        ):(
          <div/>
        )}
      <div className="w-100 bg-light" style={{'height': '500px'}}>{' '}</div>  
    </div>

    );
  }
}
 
export default withRouter(OtherProfilePage);