import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { setUserDestination } from '../../ducks/travelReducer';
import './TravelBook.scss';
import HillSide from '../../images/HillSide.jpeg';


const { REACT_APP_API_KEY } = process.env

class TravelBook extends Component {
    constructor(props){
        super(props) 
        this.state = {
            locations: [],
            userInput: ""
        }
    }

    componentDidMount(){
        this.getAllLocations()
    }

    handleChange(value){
        this.setState({
            userInput: value
        })
    }

    getData = () => {
        axios.get(`https://api.sygictravelapi.com/1.1/en/places/list?limit=10&query=${this.state.userInput}`, {
        headers: {
           "x-api-key":  REACT_APP_API_KEY
        }
       }).then(res => {
            console.log('got response')
           this.props.setUserDestination({
            userInput: res.data.data.places
           })
           console.log(res.data.data.places)
       })
    }

    getAllLocations() {
    axios.get('/api/travelbook/explore').then(res => {
        this.setState({
            locations: res.data
        })
        console.log(res.data)
    }).catch(error => console.log('GET ALL',error))
    }
    render(){
      const mappedgetAllLocations = this.state.locations.map( locations => (
          <div key={locations.location_id}>
              <div className="popular-box">
                <img className="card" src={locations.image_url} alt='location'/>
                <div className="card-info">
                     <h2 className="card-name">{locations.name}</h2>
                     <button className="card-button">Add</button>
                     <p className="card-p">{locations.description}</p>
                </div>
              </div>
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
                    <input placeholder="Destination" onChange={(e) => this.handleChange(e.target.value)}/>
                
                    {/* <select>
                        <option value="shopping">Shopping</option>
                        <option value="eating">Resturants</option>
                        <option value="sports">Sports</option>
                        <option value="discovering">Discoveries</option>
                        <option value="going_out">NightLife</option>
                        <option value="siteseeing">Siteseeing</option>
                    </select> */}
            
                    <button id="search" onClick={this.getData}>Search</button>
            </div>
        </div>
    </div> 

        <h1 className="popular-section">Popular Destination</h1>
         <hr className="popular-line"/>
        <div>{mappedgetAllLocations}</div>
        
    </div>

    )}

}

const mapStateToProps = (reduxState) => {
    return reduxState
}
const mapDispatchToProps = {
    setUserDestination 
}

const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps 
)
    export default invokedConnect(TravelBook)






     





