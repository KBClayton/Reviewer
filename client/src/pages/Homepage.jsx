import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { BrowserRouter, Route, Link } from 'react-router-dom'

class Homepage extends Component {

  // State
  state = {
    title: 'Review Site',
    subpage: 'Homepage',
    searchInput: '',
    searchResults: [],
    featured: []

   }

  searchInput = async(event) => {
     await this.setState({searchInput: event.target.value})
     if (this.state.searchInput.length === 0){
       this.setState({searchResults: []})
       return false;
     }
  // event.persist();
  //  console.log(event.target.id)
    axios.post(`/api/product/search/${this.state.searchInput}`)
      .then(res => {
        // console.log(res.data)
        this.setState({searchResults: res.data})
        console.log(this.state.searchResults)
    })
  }

  componentDidMount = ()=>{
    axios.get('/api/productpop')
      .then(res=>{
        this.setState({featured: res.data})
    })
  }
  starNumberRender=(stars)=>{
    const starArray=[]
      var starInt = Math.floor(stars.averageRating/1);
      var starRem = stars.averageRating%1;
       for(let i=0; i<starInt; i++){
         starArray.push (<i className='fas fa-star'/>);
       }
       if (starRem > .25){
         starArray.push(<i className='fas fa-star-half'/>)
       }
      return (
        <div className={this.starColor(stars)}>
          {starArray}
          <small className="text-muted"> ({stars.ratings.length} Ratings)</small>
        </div>
      )
  }

  starColor=(stars)=>{
    console.log(stars.averageRating)
    if (stars.averageRating >= 4){
      return('ml-2 text-success');
    }
    else if(stars.averageRating >= 2.5){
      return ('ml-2 text-warning');
    }
    else{
      return ('ml-2 text-danger');
    }
  }
  // searchInput =async (event)=>{
  //   await this.setState({searchInput: event.target.value})
  //   // if (this.state.searchInput.length > 0){
  //   //   return;
  //   // }
  //   this.searchProfiles();
  // }
  // Render to Screen
  render() { 
    return (
      <div className='bg-white'>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        <div className="mainSearchInputDiv">
          <input 
            type="text"
            className='text-center'
            value={this.state.searchInput} 
            onChange={this.searchInput} 
            placeholder='Search Here...'
          />        
        </div>
        <div className="container">
            <h6 className="mb-2 font-marker font-weight-bold mt-3 border-bottom border-dark">{this.state.searchResults.length} Results:</h6>
            <div className="row clearfix">
            {this.state.searchResults.map(result=>(
              <div className="col-sm-6 col-md-4 col-lg-3">
                  <Link to={'/location/' + result._id} className=''>
                    <div className="m-1">
                      <div
                        style={{
                          'maxWidth': '100%',
                          'background-image': `url(${result.picture})`,
                          'background-position': 'center',
                          'background-repeat': 'no-repeat',
                          'background-size': 'cover',
                          'opacity': '.8',
                          'height': '150px',
                          'marginBottom': '8px'
                        }}
                      />
                      <div style={{'height': '75px'}}>
                      <h6 className='font-slabo'>{result.title}</h6>
                      <div>{this.starNumberRender(result)}</div>
                      </div>
                    </div>
                    
                  </Link>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
 
export default Homepage;