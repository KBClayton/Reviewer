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
      <div className = 'bg-dark mb-5'>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />
        <div className="text-center">
          <input type="text" value={this.state.searchInput} onChange={this.searchInput} placeholder='Type Your Search Here...'/>        
        </div>
        <div className="container">
          <p className='text-center text-white'>{this.state.searchResults.length} Results Found</p>
          <div className="row">
        {this.state.searchResults.map(result=>(
          <div className="col-4 mb-3">
              <Link to={'/location/' + result._id}>
                <div className="shadow-box bg-white h-100 rounded">
                  <div
                    className='rounded-top'
                    style={{
                      'background-image': `url(${result.picture})`,
                      'background-position': 'center',
                      'background-repeat': 'no-repeat',
                      'background-size': 'cover',
                      'opacity': '.8',
                      'height': '150px'
                    }}
                  />
                  <h6 
                    className=' ml-2 mr-2 text-dark'
                    style={{'margin-bottom': '2rem'}}
                  >
                    {result.title}
                  </h6>
                  <div
                    style={{
                      'position': 'absolute',
                      'bottom':0
                    }}
                  >
                  </div>
                </div>
                
              </Link>
            
          
          }
          
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