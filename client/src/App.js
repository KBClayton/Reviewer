import React, { Component } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserRouter, Route} from 'react-router-dom'
=======
import { BrowserRouter, Route, Switch} from 'react-router-dom'
>>>>>>> merge
import './Main.css'
import Homepage from './pages/Homepage'
import AboutPage from './pages/About-Page';
import CreateUserPage from './pages/CreateUserPage';
import CreateWierdLocation from './pages/CreateWierdLocationPage';
import LoginPage from './pages/LoginPage'
<<<<<<< HEAD
=======
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './Main.css'
import Homepage from './pages/Homepage'
import AboutPage from './pages/About-Page';
>>>>>>> 198893009947411b51c2b8e204e1c9c0a0e74aee
=======
import ShowAllProducts from './pages/ShowAllProductsPage';
import ShowOneLocation from './pages/AddCommentPage'
import SearchPage from './pages/SearchPage';
>>>>>>> merge

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' component = {Homepage} exact/>
      <Route path ='/About' component = {AboutPage} exact/>
<<<<<<< HEAD
      <Route path='/createUser' component = {CreateUserPage}/>
      <Route path='/createNewLocation' component = {CreateWierdLocation}/>
      <Route path="/login" component = {LoginPage} exact/>
<<<<<<< HEAD
=======
      {/* <Route path="/login" component = {LoginPage} exact/>
      <Route path="/articles/:_id" component = {OneArticle} exact/> */}
>>>>>>> 198893009947411b51c2b8e204e1c9c0a0e74aee
    </div>
=======
      <Route path='/allproducts' component = {ShowAllProducts} exact/>
      <Route path='/location/:_id' component = {ShowOneLocation}  exact/>
      <Route path='/search' component = {SearchPage} exact/>
      <Route component = {Homepage}/>
    </Switch>
>>>>>>> merge
  </BrowserRouter>
)
export default App;

