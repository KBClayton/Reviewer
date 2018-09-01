import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import './Main.css'
import Homepage from './pages/Homepage'
import AboutPage from './pages/About-Page';
import CreateUserPage from './pages/CreateUserPage';
import CreateWierdLocation from './pages/CreateWierdLocationPage';
import LoginPage from './pages/LoginPage'
import ShowAllProducts from './pages/ShowAllProductsPage';
import ShowOneLocation from './pages/AddCommentPage'

const App = () => (
  <BrowserRouter>
    <div>
      <Route path='/' component = {Homepage} exact/>
      <Route path ='/About' component = {AboutPage} exact/>
      <Route path='/createUser' component = {CreateUserPage}/>
      <Route path='/createNewLocation' component = {CreateWierdLocation}/>
      <Route path="/login" component = {LoginPage} exact/>
      <Route path='/allproducts' component = {ShowAllProducts} exact/>
      <Route path='/location/:_id' component = {ShowOneLocation} exact/>
    </div>
  </BrowserRouter>
)
export default App;

