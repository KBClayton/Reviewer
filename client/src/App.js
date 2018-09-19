import './Main.css';
import React, { Component } from 'react';


import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

// import Homepage from './pages/Homepage';
import AboutPage from './pages/About-Page';
import CreateUserPage from './pages/CreateUserPage';
import CreateWierdLocation from './pages/CreateWierdLocationPage';
import LoginPage from './pages/LoginPage';
import ShowAllProducts from './pages/ShowAllProductsPage';
import ShowOneLocation from './pages/AddCommentPage'
import SearchPage from './pages/SearchPage';
import Chat from './pages/ChatPage';
import ReplyPage from './pages/Reply';
// import requireAuth from './components/Auth';
import SearchResultsPage from './pages/SearchResultsPage';

import ProfilePage from './pages/profile'
// import { ENETRESET } from 'constants';
    let cookieObj={};

const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    let cookieVars=document.cookie;

    // console.log(cookieVars);
    if(cookieVars!==undefined){
      //console.log("in cookievars if")
    cookieVars=cookieVars.replace(/=/g, " ")
    let cookieArray= cookieVars.split(" ")
    //console.log(cookieArray)
    let url;
    let hash;
    let port;
    let username;

      if(cookieArray.length>6){
        for(let i=0; i<cookieArray.length; i++){
        //console.log("in cookiearray if")
          if(cookieArray[i]==="username"){
            username=cookieArray[i+1].substring(0, cookieArray[i+1].length)
          }
          if(cookieArray[i]==="port"){
            port=parseInt(cookieArray[i+1])
          }
          if(cookieArray[i]==="hash"){
            hash=cookieArray[i+1].substring(0, cookieArray[i+1].length-1)
          }
          if(cookieArray[i]==="url"){
            url=cookieArray[i+1].substring(0, cookieArray[i+1].length)
          }
        }
        cookieObj.username=username;
        cookieObj.port=port;
        cookieObj.hash=hash;
        cookieObj.url=url;
        // console.log("this is cookie object")
        // console.log(cookieObj)
        
        if(cookieObj.username!==undefined && cookieObj.username.length>5)
        {
          //console.log(cookieObj.username)
        //this.setState({ redirectToReferrer: true });
        
        this.isAuthenticated = true;
        return true;
        }
      }
    }else{
      this.isAuthenticated = false;
      return false
      //console.log("not logged in")
    } 
  },
  signout(cb) {
    this.isAuthenticated = false;
    //this.setState({ redirectToReferrer: false });
  }
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  Auth.authenticate(),
  <Route
    {...rest}
    render={(props) => 
      Auth.isAuthenticated ===true 
      ? ( <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);



class App extends Component {
  
  state = { 
   }



  render() { 
    Auth.authenticate()
    // const { from } = { from: { pathname: "/allproducts" } };
    // console.log(cookieObj);

    return ( 
      <BrowserRouter>
        
        <Switch>
          <Route path='/' component = {()=><ShowAllProducts /> } exact/>
          <Route path ='/About' component = {AboutPage} exact/>
    
          <Route path='/createUser' component = {CreateUserPage}/>
          <PrivateRoute path='/createNewLocation' component = {CreateWierdLocation}/>
          <Route path="/login" component = {LoginPage} exact/>
          {/* <Route path="/login" component = {LoginPage} exact/>
          <Route path="/articles/:_id" component = {OneArticle} exact/> */}
          <Route path='/allproducts' component = {ShowAllProducts} name="allproducts" exact/>
          <Route path='/location/:_id' component = {ShowOneLocation} name="location" exact/>
          <PrivateRoute path='/search' component = {SearchPage} name="search" exact/>
          <Route path ='/searchResults/:query' component = {SearchResultsPage} name='searchResultsPage' exact/>
          {/* beginI want this to be protected */}
          <PrivateRoute path="/protected" component={ShowAllProducts} />
          <PrivateRoute path="/profile" component={ProfilePage} />
           {/*  end I want this to be protected */}
          {/* <Route component = {Homepage}/> */}
          <Route path='/reply/:_id' component= {ReplyPage}/>
          <PrivateRoute path='/chat' component = {Chat} exact/>
          <Route path='*' component = {ShowAllProducts} name ='catchAll' />

        </Switch>
      </BrowserRouter>
     );
  }
}
 
export default App;
