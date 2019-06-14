import React, { Component } from 'react';
import axios from 'axios';
import './TravelBook.scss';
import HillSide from '../../images/HillSide.jpeg';




class TravelBook extends Component {
    constructor(props){
        super(props) 
        this.state = {
            locations: []
        }
    }

    componentDidMount(){
        this.getAllLocations()
    }

    getAllLocations() {
    axios.get('/api/travelbook/explore').then(res => {
        this.setState({
            locations: res.data
        })
        console.log(res.data)
    }).catch(error => console.log(error))
    }
    render(){
      const mappedgetAllLocations = this.state.locations.map( locations => (
          <div key={locations.location_id}>
              <h2>{locations.name}</h2>
              <img src={locations.image_url} alt='location'/>
          </div>
      ))
    return (
    <div> 
    
        <div className="section">
            <img className="header-img" src={HillSide} alt="BlueOcean" />
        
        <div className="section-container">
        
                <h3>Choose Your Destination</h3>
                <hr/>
            <div className="search-bar">
                    <input placeholder="Destination"/>
                
                    <select>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
            
                    <button>Search</button>
            </div>
        </div>
    </div> 

        <h1>Explore </h1>
        <div>{mappedgetAllLocations}</div>
        
    </div>

    )}

}
    export default TravelBook






     





