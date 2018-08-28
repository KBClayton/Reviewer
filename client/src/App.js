import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import './Main.css'
import Homepage from './pages/Homepage'
import AboutPage from './pages/About-Page';
import CreateUserPage from './pages/CreateUserPage';

const App = () => (
  <BrowserRouter>
    <div>
      <Route path='/' component = {Homepage} exact/>
      <Route path ='/About' component = {AboutPage} exact/>
      <Route path='/createUser' component = {CreateUserPage}/>
      {/* <Route path="/login" component = {LoginPage} exact/>
      <Route path="/articles/:_id" component = {OneArticle} exact/> */}
    </div>
  </BrowserRouter>
)
export default App;

