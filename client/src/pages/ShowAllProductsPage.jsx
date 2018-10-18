import React, { Component } from 'react';
// import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import LocationDisplay from '../components/LocationDisplay/LocationDisplay'
// import RateProductStars from '../components/RatingStars/ratingstars'
// import LinkWrapper from '../components/LinkWrapper/LinkWrapper'
import { Link } from 'react-router-dom'

// import './main.css'
import axios from 'axios'
// import RatingStars from '../components/RatingStars/ratingstars';

class ShowAllProducts extends Component {

  // State
  state = {
    title: "Reviewer",
    subpage: 'Show All Products',
    locations: [],
    color: []
  }

  // Loads All Articles
  loadLocations = () => {
  axios.get("/api/productpop")
    .then(res => {
    // console.log(res.data);
      this.setState({locations: res.data})
      console.log(this.state.locations)
    })
  }

  componentDidMount(){
    this.loadLocations();
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
  

  // Render to Screen
  render() { 
    // console.log(this.props)
    return (
      <div>          
        <Header title = {this.state.title}subpage = {this.state.subpage}/>
        
        <div className="container">
          <div className="row">
            {this.state.locations.map(result=>(
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
        <Footer/> 
      </div>
    );
  }
}
 
export default ShowAllProducts;