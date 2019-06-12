import React, { Component }from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import TravelBook from './Components/TravelBook/TravelBook';
import About from './Components/TravelBook/About/About';
import SignIn from './Components/TravelBook/SignIn/SignIn';
import Dashboard from './Components/Dashboard/Dashboard';
import Explore from './Components/Explore/Explore';
import CreateAccount from './Components/TravelBook/CreateAccount/CreateAccount';
import './App.css';

class App extends Component {
render(){
 return (

   <div className="App" >
        <ul>
            <li><NavLink to="/" exact activeStyle={{color:'green'}} >Travel Book</NavLink></li>
            <li><NavLink to="/about" exact activeStyle={{color:'green'}}> How It Works </NavLink></li>
            <li><NavLink to="/signin" exact activeStyle={{color:'green'}}>SignIn</NavLink></li>
            <li><NavLink to="/create-account" exact activeStyle={{color:'green'}}>Create Account</NavLink></li>
        </ul>
      <Switch>
          <Route path="/"  exact strict component={TravelBook} />
          <Route path="/about" exact strict component={About} />
          <Route path="/signin" exact strict component={SignIn} />
          <Route path="/create-account" exact strict component={CreateAccount} />
          <Route path="/explore"  exact strict component={Explore} />
          <Route path="/dashboard" exact strict component={Dashboard} />
 
      </Switch>


  </div>

 )
 }
}

export default App; 
