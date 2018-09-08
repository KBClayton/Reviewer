import React, { Component } from 'react';


import { BrowserRouter, Route, Switch, Redirect, withRouter, Link} from 'react-router-dom'
import './Main.css'
import Homepage from './pages/Homepage'
import AboutPage from './pages/About-Page';
import CreateUserPage from './pages/CreateUserPage';
import CreateWierdLocation from './pages/CreateWierdLocationPage';
import LoginPage from './pages/LoginPage'
import ShowAllProducts from './pages/ShowAllProductsPage';
import ShowOneLocation from './pages/AddCommentPage'
import SearchPage from './pages/SearchPage';
<<<<<<< HEAD
import Chat from './pages/ChatPage';
=======
import requireAuth from './components/Auth'



>>>>>>> b537036ee5595ac2a96730af3695322fb16dc058


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' component = {Homepage} exact/>
      <Route path ='/About' component = {AboutPage} exact/>

      <Route path='/createUser' component = {CreateUserPage}/>
      <Route path='/createNewLocation' component = {CreateWierdLocation}/>
      <Route path="/login" component = {LoginPage} exact/>
      {/* <Route path="/login" component = {LoginPage} exact/>
      <Route path="/articles/:_id" component = {OneArticle} exact/> */}
      <Route path='/allproducts' component = {ShowAllProducts} name="allproducts" exact/>
      <Route path='/location/:_id' component = {ShowOneLocation} name="location" exact/>
      <Route path='/search' component = {SearchPage} name="search" exact/>

      {/* beginI want this to be protected */}
      <Route path="/test/" component={App} onEnter={requireAuth}>
        <Route path="allproducts" component={ShowAllProducts}/>
      </Route> {/*  end I want this to be protected */}
      {/* <Route component = {Homepage}/> */}
      <Route path='/chat' component = {Chat} exact/>
    </Switch>
  </BrowserRouter>
)
export default App;

