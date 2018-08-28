import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './Main.css'
import Homepage from './pages/Homepage'
import AboutPage from './pages/About-Page';

const App = () => (
  <BrowserRouter>
    <div>
      <Route path='/' component = {Homepage} exact/>
      <Route path ='/About' component = {AboutPage} exact/>
      {/* <Route path="/login" component = {LoginPage} exact/>
      <Route path="/articles/:_id" component = {OneArticle} exact/> */}
    </div>
  </BrowserRouter>
)
export default App;

