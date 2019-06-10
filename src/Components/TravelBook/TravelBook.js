import React, { Component } from 'react';
// import axios from 'axios';
import { NavLink } from 'react-router-dom';


function TravelLinks (){
    return (
        <div>
            <NavLink exact to='/'>TravelBook</NavLink>
            <NavLink to='/how-it-works'>How It Works</NavLink>
            <NavLink to='/signup'>Create Acount</NavLink>
        </div>
    )
}
class TravelBook extends Component {
    // super(props){
    // this.state = {
    //     username: "",
    //     password: "",
    //     email: ""

    // }
    // }

    render(){
        return (
            <TravelLinks />
        )
    }
}




export default TravelBook