import React, { Component } from 'react';


import { BrowserRouter, Route, Switch, Redirect, withRouter, Link} from 'react-router-dom'
import './Main.css';
import Homepage from './pages/Homepage';
import AboutPage from './pages/About-Page';
import CreateUserPage from './pages/CreateUserPage';
import CreateWierdLocation from './pages/CreateWierdLocationPage';
import LoginPage from './pages/LoginPage';
import ShowAllProducts from './pages/ShowAllProductsPage';
import ShowOneLocation from './pages/AddCommentPage'
import SearchPage from './pages/SearchPage';
import Chat from './pages/ChatPage';
import ReplyPage from './pages/Reply';
import requireAuth from './components/Auth';
import SearchResultsPage from './pages/SearchResultsPage';


const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    let cookieVars=document.cookie;
    let cookieObj={};
    //console.log(cookieVars);
    if(cookieVars!==undefined){
      //console.log("in cookievars if")
    cookieVars=cookieVars.replace(/=/g, " ")
    let cookieArray= cookieVars.split(" ")
    //console.log(cookieArray)
      if(cookieArray.length===6){
        //console.log("in cookiearray if")
        let username=cookieArray[1].substring(0, cookieArray[1].length-1)
        let port=parseInt(cookieArray[3])
        let hash=cookieArray[5].substring(0, cookieArray[5].length-1)
        cookieObj.username=username;
        cookieObj.port=port;
        cookieObj.hash=hash;
        //console.log(cookieObj)
        if(cookieObj.username!==undefined && cookieObj.username.length>5)
        {
          //console.log(cookieObj.username)
        //this.setState({ redirectToReferrer: true });
        this.isAuthenticated = true;
        }
      }
    }else{
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
    render={props => 
      Auth.isAuthenticated ? (
        <Component {...props} />
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
    redirectToReferrer: false
   }
  render() { 
    return ( 
      <BrowserRouter>
        
        <Switch>
          <Route path='/' component = {()=><Homepage /> } exact/>
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
          <PrivateRoute path="/try2" component={SearchPage} />
           {/*  end I want this to be protected */}
          {/* <Route component = {Homepage}/> */}
          <Route path='/reply/:_id' component= {ReplyPage}/>
          <Route path='/chat' component = {Chat} exact/>
        </Switch>
      </BrowserRouter>
     );
  }
}
 
export default App;
