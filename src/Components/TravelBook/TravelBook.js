import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { allDestinations } from '../../ducks/travelReducer';
import { setUser } from '../../ducks/userReducer';
import './TravelBook.scss';
import HillSide from '../../images/HillSide.jpeg';
import BlueOcean from '../../images/BlueOcean.jpeg';
import Havana from '../../images/Havana.jpeg';
import Siargao from '../../images/Siargao.jpeg';
import Dinant from '../../images/Dinant.jpeg';
import Spain from '../../images/Spain.jpeg';
import Location from '../../images/Location.svg';

  
const { REACT_APP_API_KEY } = process.env;



class TravelBook extends Component {
    constructor(props){
        super(props) 
        this.state = {
           userInput: "",
           option: "",
           spain: []
           
        }
    }

    componentDidMount(){
        this.getData()
        this.getSpian()
    }

    handleChange(value){
        this.setState({
            userInput: value

        })
    }

    getData = () => {
        const { userInput } = this.state
        console.log(this.state.option)
        console.log(userInput)
        axios.get(`/api/travelbook/destinations/${this.state.option}/${userInput}`)
        .then(res => {
            console.log('got response')
           this.props.allDestinations(res.data)
           console.log(res.data)
       })

    }



    getSpian = () => {
        axios.get('https://api.sygictravelapi.com/1.1/en/places/list?parents=country:13&levels=city&limit=1',  {
             headers: {
            "x-api-key":  REACT_APP_API_KEY
         }
        }).then(res => {
             console.log('got response')
            this.setState({
                spain: res.data.data.places
            })
            console.log(res.data.data.places)
        })
    }

    

    render(){
    const { user } = this.props.userReducer;
    console.log(this.state)
    const mappedSpain = this.state.spain.map(place => (
      
        <div key={place.id}>
              <div className="popular-box">
              <img className="card" src={Spain} alt="spain"/>
              <div className="card-info">
                <h2 className="card-name">{place.name}</h2>
                <p className="card-subtitle"><img src={Location} alt='location'/> Spain: {place.name} </p>
                <p className="card-p"> {place.perex}</p>
                <button className="card-button"><a href={place.url}>Learn More</a></button>
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
               
                <select value={this.state.option} onChange={(e) => {
                    this.setState({
                        option: e.target.value
                    })
                }}>
                    <option value="">Select Continent</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                </select>

                <input placeholder="Country" onChange={(e) => this.handleChange(e.target.value)}/>
                
                {!user ? 
                ( <Link to="/create-account" style={{ color: 'white', textDecoration: 'none'}}>
                <button id="search" onClick={this.getData}>Search</button>
                </Link>)
                :
                (<Link to="/explore" style={{ color: 'white', textDecoration: 'none'}}>
                <button id="search" onClick={this.getData}>Search</button>
                </Link>)
                }

         </div>
        
        </div>
 
        </div>
       
      <h1 className="popular-section">Popular Destinations</h1>
      <hr className="popular-line"/>
           <div className="popular-box">
               <div> {mappedSpain}</div> 
                <div className="popular-box-2">
                    <img className="card-2" src={BlueOcean} alt='location'/>
                
                    <div className="card-info-2">
                            <h2 className="card-name">Norway</h2>
                            <p className="card-subtitle"><img src={Location} alt='location'/>Norway: Bergen </p>
                            <button className="card-button">Learn More</button>
                    </div>
                </div>
          </div>


          <div className="container-2">
                <div className="popular-box-2">
                        <img className="card-2" src={Havana} alt='location'/>
                        
                            <div className="card-info-2">
                                    <h2 className="card-name">Havana</h2>
                                    <p className="card-subtitle"><img src={Location} alt='location'/> Cuba: Havana </p>
                                    <button className="card-button">Learn More</button>
                            </div>
                </div>
            <div className="popular-box-2">
                        <img className="card-2" src={Dinant} alt='location'/>
                    
                        <div className="card-info-2">
                                <h2 className="card-name">Dinant</h2>
                                <p className="card-subtitle"><img src={Location} alt='location'/> Belgium: Dinant </p>
                                    <button className="card-button">Learn More</button>
                    </div>
            </div>
            <div className="popular-box-2">
                        <img className="card-2" src={Siargao} alt='location'/>
                    
                        <div className="card-info-2">
                                <h2 className="card-name">Siargao Island</h2>
                                <p className="card-subtitle"><img src={Location} alt='location'/>  Philippines: Siargao Island  </p>
                                    <button className="card-button">Learn More</button>
                    </div>
            </div>
        </div>

        <hr className="popular-line-2"/>
       <footer></footer>

    </div>

    )}

}

const mapStateToProps = (reduxState) => {
    return reduxState
}
const mapDispatchToProps = {
    allDestinations, 
    setUser
}

const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps 
)
    export default invokedConnect(TravelBook)






     



