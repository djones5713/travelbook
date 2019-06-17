import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserDestination } from '../../ducks/travelReducer';
import './TravelBook.scss';
import HillSide from '../../images/HillSide.jpeg';
import BlueOcean from '../../images/BlueOcean.jpeg';


class TravelBook extends Component {
    constructor(props){
        super(props) 
        this.state = {
           userInput: "",
           option: ""
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
           this.props.setUserDestination({
            userInput: res.userDestination
           })
           console.log(res.data)
       })

    }



    render(){
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
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Europe">Europe</option>
                    <option value="Aisa">Aisa</option>
                    <option value="Africa">Africa</option>
                </select>

                <input placeholder="Country" onChange={(e) => this.handleChange(e.target.value)}/>
                <Link to="/explore" style={{ color: 'white', textDecoration: 'none'}}>
                <button id="search" onClick={this.getData}>Search</button>
                </Link>
            </div>
        
            </div>
 
        </div>

        <h1 className="popular-section">Popular Destination</h1>
        <hr className="popular-line"/>
            <div className="popular-box">
                    <img className="card" src={BlueOcean} alt='location'/>
                <div className="card-info">
                    <h2 className="card-name">Netherlands</h2>
                    <button className="card-button">Add</button>
                </div>
            </div>


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






     



