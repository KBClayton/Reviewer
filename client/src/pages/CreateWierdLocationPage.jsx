import React, {Component} from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import axios from 'axios'

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

    console.log(newLocation)
    
    axios.post('/api/product', newLocation)
      .then((response) => {
        console.log(response)
        // If Successfully Posted
        if (response.status === 200){
          this.setState({productSuccess: 'true' });
          // this.props.history.push('/home')
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

  searchAPILocations = () => {
    
  }

  // Render to Screen
  render() { 
    return (
      <div className = ''>          
        <Header 
          title = {this.state.title}
          subpage = {this.state.subpage}
        />

        <form className='container bg-light mt-3'>
          <br/>
          <input 
            className='m-2'
            name='locationName'
            placeholder='Name of Location'
            type='text' 
            value={this.state.locationName}
            onChange={e => this.setState({ locationName: e.target.value})}
          />
          <input 
            className='m-2'
            name='link'
            placeholder='Website'
            type='url' 
            value={this.state.link}
            onChange={e => this.setState({ link: e.target.value})}
          />
          <textarea
            className='m-2'
            name='description'
            placeholder='Description of Location'
            type="text"
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          <input 
            className='m-2'
            name='address'
            placeholder='address'
            type='text' 
            value={this.state.address}
            onChange={e => this.setState({ address: e.target.value})}
          />
          <br/>
          <button
            className='m-2 btn btn-info btn-small'
            onClick={this.handleSubmit}
          >
            Submit
          </button>
          <br/>
          <p className="text-danger">{this.state.productSuccess}</p>
        </form>

        <Footer/>
      </div>

    );
  }
}
 
export default withRouter(CreateWierdLocation);