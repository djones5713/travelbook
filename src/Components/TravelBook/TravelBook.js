import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { allDestinations } from '../../ducks/travelReducer';
import { setUser } from '../../ducks/userReducer';
import './TravelBook.scss';
import HillSide from '../../images/HillSide.jpeg';
import BlueOcean from '../../images/BlueOcean.jpeg';
import Location from '../../images/Location.svg';

  

class TravelBook extends Component {
    constructor(props){
        super(props) 
        this.state = {
           userInput: "",
           option: "",
           
        }
    }

    componentDidMount(){
        this.getData()
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



    render(){
    const { user } = this.props.userReducer;
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

      <h1 className="popular-section">Popular Destination</h1>
      <hr className="popular-line"/>
            <div className="popular-box">
                  <img className="card" src={BlueOcean} alt='location'/>
               <div className="card-info">
                     <h2 className="card-name">Norway</h2>
                    <p className="card-subtitle"><img src={Location} alt='location'/> Norway: Bergen </p>

                     <p>Norway is a Scandinavian country encompassing mountains, 
                         glaciers and deep coastal fjords. Preserved 9th-century Viking ships are 
                         displayed at Oslo’s Viking Ship Museum. Bergen, with colorful wooden
                          houses, is the starting point for cruises to the dramatic Sognefjord. 
                          Norway is also known for fishing, hiking and skiing, notably at Lillehammer’s
                          Olympic resort.</p>
                          <button className="card-button">Learn More</button>
                 </div>
         

                <div className="popular-box-2">
                    <img className="card-2" src={BlueOcean} alt='location'/>
                
                    <div className="card-info-2">
                            <h2 className="card-name">Norway</h2>
                            <p className="card-subtitle"><img src={Location} alt='location'/> Norway: Bergen </p>
                                <button className="card-button">Learn More</button>
                    </div>
                </div>
          </div>
          <div className="popular-box-2">
                    <img className="card-2" src={BlueOcean} alt='location'/>
                
                    <div className="card-info-2">
                            <h2 className="card-name">Norway</h2>
                            <p className="card-subtitle"><img src={Location} alt='location'/> Norway: Bergen </p>
                                <button className="card-button">Learn More</button>
                    </div>
         </div>


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






     



