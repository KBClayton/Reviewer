import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AlbumNew from "./components/Album"
import Axios from "axios"

class App extends Component {
  state={
    title:"",
    artist:"",
    date:'',
    albums:[],
  }
  componentDidMount= ()=>{
    this.loadAlbums();
  }
  handleChange= event=>{
    event.target.name

  }
  submitForm= event=>{
    event.preventdefault();
  }

  loadAlbums= ()=>{
    Axios.request("")
  }
  render() {
    let thing=<AlbumNew/>;
    return( <div>
      <AlbumNew  released={"date"} title={"title1"} artist= {"artists"} submitForm={this.submitForm} handleChange={this.handleChange}/>
      <DisplayAlbum/>
    </div>);
  }
}

export default App;
