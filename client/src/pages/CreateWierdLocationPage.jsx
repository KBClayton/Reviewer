import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
import '../Main.css'

let jsonpAdapter = require('axios-jsonp');
 


class CreateWierdLocation extends Component {

  // State
  state = {
    title: 'Reviewer',
    subpage: 'CreateLocation',
    locationName: '',
    picture: '',
    link: '',
    description: '',
    address: '',
    gpsdata: {
      lat: 30.2672,
      long: 97.7431
    },
    productSuccess: ''
  }

  // Handle Form Submit
  handleSubmit = (event) => {
    event.preventDefault();

    // Create newUser Post
    const newLocation = {
      title: this.state.locationName,
      description: this.state.description,
      picture: this.state.picture,
      link: this.state.link,
      address: this.state.address,
      gpsdata: this.state.gpsdata
    }

    // console.log(newLocation)
    
    axios.post('/api/product', newLocation)
      .then((response) => {
        // console.log(response)
        // If Successfully Posted
        if (response.status === 200){
          this.setState({productSuccess: 'true' });
          this.props.history.push(`/searchResults/${response.data.title}`)
        }
        // If Unsuccessful
        else{
          alert(`Product Error`)
        }

      })
      .catch(function(error){
        console.log(error);
      })
  }

  searchAPILocations = (event) => {
    event.preventDefault();
    if (this.state.location !== ''){
    // console.log('You ran the function')
    var queryURLBasic =   ("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + this.state.locationName +"&srwhat=text&srprop=timestamp&continue=&format=json");

    axios({
      url: queryURLBasic,
      adapter: jsonpAdapter
      // callbackParamName: 'c' // optional, 'callback' by default
    }).then((res) => {
      // console.log(res)
      const pageID = res.data.query.search[0].pageid

      axios({
        url: "https://en.wikipedia.org/w/api.php?format=json&titles=" + res.data.query.search[0].title + "&action=query&prop=extracts&exsectionformat=plain&exintro=&explaintext=&",
        adapter: jsonpAdapter
      }).then((response)=> {
        const annoyed =response.data.query.pages[pageID].extract
        // console.log(response.data.query.pages[pageID])
        this.setState({description: annoyed})
      })
    });
    let googleURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + this.state.locationName + "&inputtype=textquery&fieldsplace_id&locationbias=circle:2000@47.6918452,-122.2226413&key=AIzaSyCta4EWC0H7ZXJUnr4h2Dq7zD-d6LCa10A"
    axios({
      url: googleURL,
      adapter: jsonpAdapter
    })
      .then((googleresponse) => {
        // console.log('Google Response,')
        // console.log(googleresponse)
        if (googleresponse.data.results[0]){
          this.setState({address: googleresponse.data.results[0].formatted_address})          
        }
      })
    }
  }

  // Render to Screen
  render() { 
    return (
      <div>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        /><div className='container  text-center'>
        <div className='mt-3 bg-info d-inline-blocker'>
          
            <div className=''>
              <h3 className=' pt-2 font-marker text-center text-white mb-0'>Share Something Wierd</h3>
              <h5 className='font-slabo text-center text-white'>For Others To Rate and Review</h5>
            </div>  
              <div className='d-flex justify-content-center mt-3 mb-2'>
                <input 
                  className='input-pill rounded'
                  style={{'width': '192px'}}
                  name='Location Name'
                  placeholder='Name of Location'
                  type='text' 
                  value={this.state.locationName}
                  onChange={e => this.setState({ locationName: e.target.value})}
                />
                <button
                  className='Search ml-1'
                  onClick={this.searchAPILocations}
                >
                Find
                </button>
              </div>
              <div className='text-center mb-2'>
                <input
                  style={{'width': '238px'}}
                  className='input-pill rounded'
                  name='link'
                  placeholder='Website...'
                  type='url' 
                  value={this.state.link}
                  onChange={e => this.setState({ link: e.target.value})}
                />
              </div>
              <div className='text-center mb-2'>
                <textarea
                  style={{'width': '238px', 'minHeight': '100px'}}
                  className='input-pill rounded '
                  name='description'
                  placeholder='Description of Location'
                  type="text"
                  value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </div>
              <div className='text-center mb-2'>
                <input 
                  style={{'width': '238px'}}
                  className='input-pill rounded '
                  name='address'
                  placeholder='Address'
                  type='text' 
                  value={this.state.address}
                  onChange={e => this.setState({ address: e.target.value})}
                />
              </div>
              <div className='text-center mb-2'>
                <input
                  style={{'width': '238px'}}
                  className='input-pill rounded '
                  name='picture'
                  type='text'
                  placeholder='Add picture here...'
                  value={this.state.picture}
                  onChange={e => this.setState({ picture: e.target.value})}
                />
              <div className='text-center mb-3 mt-3'>
                <button
                  className='input-pill'
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
              <p className="text-danger">{this.state.productSuccess}</p>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
 
export default withRouter(CreateWierdLocation);