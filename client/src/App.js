import React, { Component } from 'react';
<<<<<<< HEAD
import { BrowserRouter, Route} from 'react-router-dom'
import './Main.css'
import Homepage from './pages/Homepage'
import AboutPage from './pages/About-Page';
import CreateUserPage from './pages/CreateUserPage';
import LoginPage from './pages/LoginPage'
=======
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './Main.css'
import Homepage from './pages/Homepage'
import AboutPage from './pages/About-Page';
>>>>>>> 198893009947411b51c2b8e204e1c9c0a0e74aee

const App = () => (
  <BrowserRouter>
    <div>
      <Route path='/' component = {Homepage} exact/>
      <Route path ='/About' component = {AboutPage} exact/>
<<<<<<< HEAD
      <Route path='/createUser' component = {CreateUserPage}/>
      <Route path="/login" component = {LoginPage} exact/>
=======
      {/* <Route path="/login" component = {LoginPage} exact/>
      <Route path="/articles/:_id" component = {OneArticle} exact/> */}
>>>>>>> 198893009947411b51c2b8e204e1c9c0a0e74aee
    </div>
  </BrowserRouter>
)
export default App;

