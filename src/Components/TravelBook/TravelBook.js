import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { allDestinations } from '../../ducks/travelReducer';
import { setUser } from '../../ducks/userReducer';
import NavBar from '../Navigation/NavBar';
import './TravelBook.scss';
import HillSide from '../Images/HillSide.jpeg';
import BlueOcean from '../Images/BlueOcean.jpeg';
import Havana from '../Images/Havana.jpeg';
import Siargao from '../Images/Siargao.jpeg';
import Dinant from '../Images/Dinant.jpeg';
import Location from '../Images/Location.svg';

  
const { REACT_APP_API_KEY } = process.env;



class TravelBook extends Component {
    constructor(props){
        super(props) 
        this.state = {
           userInput: "",
           option: "",
           norway: [],
           cuba: [],
           belgium: [],
           philippines: []
        }
    }

    componentDidMount(){
        this.getData()
        this.getNorway()
        this.getCuba()
        this.getBelgium()
        this.getPhilippines()
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


    getNorway = () => {
        axios.get('https://api.sygictravelapi.com/1.1/en/places/list?parents=country:4&levels=city&limit=1',  {
             headers: {
            "x-api-key":  REACT_APP_API_KEY
         }
        }).then(res => {
            //  console.log('got response')
            this.setState({
                norway: res.data.data.places
            })
            // console.log(res.data.data.places)
        })
    }

    getCuba = () => {
        axios.get('https://api.sygictravelapi.com/1.1/en/places/list?parents=country:51&levels=city&limit=1',  {
             headers: {
            "x-api-key":  REACT_APP_API_KEY
         }
        }).then(res => {
            //  console.log('got response')
            this.setState({
                cuba: res.data.data.places
            })
            // console.log(res.data.data.places)
        })
    }

    getBelgium = () => {
        axios.get('https://api.sygictravelapi.com/1.1/en/places/list?parents=country:51&levels=city&limit=1',  {
             headers: {
            "x-api-key":  REACT_APP_API_KEY
         }
        }).then(res => {
            //  console.log('got response')
            this.setState({
                belgium: res.data.data.places
            })
            // console.log(res.data.data.places)
        })
    }

    getPhilippines = () => {
        axios.get('https://api.sygictravelapi.com/1.1/en/places/list?parents=country:94&levels=city&limit=1',  {
             headers: {
            "x-api-key":  REACT_APP_API_KEY
         }
        }).then(res => {
             console.log('got response')
            this.setState({
                philippines: res.data.data.places
            })
            console.log(res.data.data.places)
        })
    }





    

    render(){
    const { user } = this.props.userReducer;
    // console.log(this.state)
    const mappedNorway = this.state.norway.map(place => (
      
        <div key={place.id}>
            <div className="popular-box-2">
                <img className="card-2" src={BlueOcean} alt='location'/>
                <div className="card-info-2">
                        <h2 className="card-name">{place.name}</h2>
                        <p className="card-subtitle"><img src={Location} alt='location'/>Norway:{place.name}</p>
                        <button className="card-button"><a href={place.url}>Learn More</a></button>
                </div>
            </div>



        </div>
           
    ))
    
    const mappedCuba = this.state.cuba.map(place => (
      
        <div key={place.id}>
            <div className="popular-box-2">
                <img className="card-2" src={Havana} alt='location'/>
                <div className="card-info-2">
                        <h2 className="card-name">{place.name}</h2>
                        <p className="card-subtitle"><img src={Location} alt='location'/>Cuba:{place.name}</p>
                        <button className="card-button"><a href={place.url}>Learn More</a></button>
                </div>
            </div>



        </div>
           
    ))

    const mappedBelgium = this.state.belgium.map(place => (
      
        <div key={place.id}>
            <div className="popular-box-2">
                <img className="card-2" src={Dinant} alt='location'/>
                <div className="card-info-2">
                        <h2 className="card-name">{place.name}</h2>
                        <p className="card-subtitle"><img src={Location} alt='location'/>Belgium:{place.name}</p>
                        <button className="card-button"><a href={place.url}>Learn More</a></button>
                </div>
            </div>
        </div>
           
    ))

    const mappedPhilippines = this.state.philippines.map(place => (
       
        <div key={place.id}>
            <div className="popular-box-2">
                <img className="card-2" src={Siargao} alt='location'/>
                <div className="card-info-2">
                        <h2 className="card-name">{place.name}</h2>
                        <p className="card-subtitle"><img src={Location} alt='location'/>Philippines:{place.name}</p>
                        <button className="card-button"><a href={place.url}>Learn More</a></button>
                </div>
            </div>
        </div>
           
    ))



    return (

        <div>
        <div className="section">
            <NavBar />
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
      <div>
           <div className="popular-box">
               <div>{mappedNorway}</div>
               <div>{mappedCuba}</div>
               <div>{mappedBelgium}</div>
               <div>{mappedPhilippines}</div>
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






     



