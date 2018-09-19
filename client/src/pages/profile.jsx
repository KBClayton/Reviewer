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

class ProfilePage extends Component {
  // super(props)
// State
state = {
    big:{},
    username: '',
    password_o:'',
    password_v:'',
    password:'',
    title:'',
    email: '',
    emailVerified: false,
    locations:[],
    comments:[],
    replies:[],
    reviews:[],
    ratings:[],
    avgProdRate:0,
    revUp:0,
    revDown:0
   }

 //get the user's data
 loadProfile = () => {
    axios.get( `/api/user/allstuff`)
      .then(res => {
      //console.log("returned data from get")
      //console.log(res.data);
      // console.log('Something Hapened')
        this.setState({username:res.data.username})
        this.setState({email:res.data.email})
        this.setState({emailVerified:res.data.emailVerified})
        this.setState({locations: res.data.products})
        this.setState({reviews: res.data.reviews})
        this.setState({comments: res.data.replies})
        this.setState({productRating: res.data.productRatings})
        this.setState({title:res.data.username+"'s Profile"})
        this.setState({ratings:res.data.reviewRatings})
        this.setState({replies:res.data.replies})
        //console.log(this.state);
        axios.get('/api/user/averagereview').then(res=>{
            console.log(res)
            this.setState({avgProdRate:res.data.averageProductRating})
            this.setState({revDown:res.data.revDown})
            this.setState({revUp:res.data.revUp})
        })
        // console.log(this.state.comments.length)
        //this.calculateRating();
    })
  }

  //start the stuff
  componentDidMount(){
    this.loadProfile();
  }


  


  // Handle Form Submit
  handleSubmit = (event) => {
    event.preventDefault();
    // Password Complexity Verification
    var regexPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
    if (!regexPassword.test(this.state.password.trim())){
    	this.setState({errorMsg: {passwordTooShortError: 'Password needs to contain: 8+ characters, 1+ uppercase letter, 1+ numbers and at least one symbol'}})
    	return false;
    }
    //Password Matches Verification
    if (this.state.password !== this.state.password_v){
      this.setState({errorMsg: {passwordDoesntMatchError: 'Passwords Do Not Match'}})
      return false;
    }

    const newUser = {
      password: this.state.password_o.trim(),
      newPasssword:this.state.password.trim()
    }

    console.log(newUser)
    
    axios.put('/api/user/', newUser)
      .then((response) => {
        console.log(response)
        // this.setState()
        if (response.data.success === true){
          console.log(this)
          // this.setState({accountAccepted: true });
          this.props.history.push('/login')
        }
        else{
          alert(`This username or email is taken. Please try another.  May We Suggest BananaMan78!`)
        }

      })
      .catch(function(error){
        console.log(error);
      })
  }

  redirect = (event) => {
    if (this.state.accountAccepted){
      return <Redirect to='/login'/>
    }
  }

  // Render to Screen
  render() { 
    return (
      <div className = 'bg-light mb-5'>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        

        
        <form className='container'>
        
        <h4>Username:  {this.state.username}</h4>
        <h4>Email:  {this.state.email}</h4>
        <h4>{this.state.emailVerified?(<p>Your email has been verified</p> ):(<p>Your email has not been verified</p>)}</h4>
          <p className='m-0 p-0 text-danger'></p>
          <input
            className='m-2'
            name='password_o'
            placeholder='Old Passcode'
            type="password"
            value={this.state.password_o}
            onChange={e => this.setState({ password_o: e.target.value})}
          />
          <br/>
          <input
            className='m-2'
            name='password'
            placeholder='New Passcode'
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value})}
          />
          <p className='m-0 p-0 text-danger'></p>
          <input
            className='m-2'
            name='password_v'
            placeholder='Retype new Passcode'
            type="password"
            value={this.state.password_v}
            onChange={e => this.setState({ password_v: e.target.value})}
          />
          <input type="file"/>
          <br/>
          <button
            className='m-2 btn btn-info btn-small'
            onClick={this.handleSubmit}
          >
            Submit
          </button>

        </form>

        {this.state.locations.length > 0 ? (
            <div>
            <h4 className='text-center'>You have posted {this.state.locations.length} wierd things</h4>
            {this.state.locations.map(location => (
            <div key={location._id}>
                <Link to={'/location/' + location._id}>
                <LocationDisplay
                    key = { location._id}
                    id = {location._id}
                    imageUrl = {location.picture}
                    address = {location.address}
                    // link = {location.link}
                    title = {location.title}
                    description = {location.description}
                    // urlLink = {'/location/' + location._id}
                    lengthNo = {location.reviews.length}
                    Rating = {'Average Rating: ' + location.averageRating + ' Stars'}
                    noOfRatings = {location.ratings.length + ' Ratings'}
                />
                </Link>
            </div>
            ))}
            </div>
        ):(
            <p className='text-center text-danger'>You have no products posted</p>
        )
        }
        {this.state.reviews.length>0?(
            <div>
                <h4 className='text-center'>You have reviewed {this.state.reviews.length} wierd things</h4>
                {this.state.reviews.map(review => (
                    <CommentDisplay
                    key = {review._id}
                    id = {review._id}
                    textComment = {review.text}
                    replies = {review.replies}
                    onChange={e => this.setState({ newReply: e.target.value})}
                    CommentType = {'Reply - ' + review.username + ' ' + moment(review.dateCreated).format("MMM Do YYYY")}
        
                    />
                ))}  
            </div>
        ):(
            <p className='text-center text-danger'>You have not reviewd anything</p>
        )}
        {this.state.comments.length>0?(
            <div>
            <h4 className='text-center'>You have commented on {this.state.comments.length} reviews</h4>
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
            </div>
        ):(
            <p className='text-center text-danger'>You have not commented on anything</p>
        )}
        {this.state.ratings.length>0?(
            <h4 className='text-center'>You have rated {this.state.ratings.length} wierd things, with an average rating of {this.state.avgProdRate} </h4>
        ):(
            <p className='text-center text-danger'>You have not rated anything</p>
        )}
        {this.state.reviews.length>0?(
            <h4 className='text-center'>You have rated {this.state.comments.length} reviews with {this.state.revUp} thumps up and {this.state.revDown} thumbs down</h4>
        ):(
            <p className='text-center text-danger'>You have not rated any reviews</p>
        )}


        <Footer/>
      </div>

    );
  }
}
 
export default withRouter(ProfilePage);