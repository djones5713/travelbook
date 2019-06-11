import React from 'react';
import { NavLink } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import SignUp from './SignUp/SignUp';
import About from './About/About';


function TravelBook (){
    return (
        <div>
            <NavLink exact to='/'>TravelBook</NavLink>
            <NavLink to='/how-it-works'>How It Works</NavLink>
            <NavLink to='/signup'>Create Account</NavLink>
        
    <Switch>
        <Route path="/" />
        <Route strict path="/signup" component={SignUp} />
        <Route path="/how-it-works" component={About} />
        <Route path='*'
        render={() => {
          return <div>PAGE NOT FOUND</div>
        }} />
    </Switch>
        </div>
    )
}




export default TravelBook