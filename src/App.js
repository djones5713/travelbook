import React, { Component }from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';


const User = ({match}) => {
  return (<h1> Hello about {match.params.username}</h1>)
}

class App extends Component {
render(){
 return (
  <Router>
    <div className="App">
    <ul>
    <li><NavLink to="/" exact activeStyle={{color:'green'}} >Home</NavLink></li>
    <li><NavLink to="/about" exact activeStyle={{color:'green'}}>About</NavLink></li>
    <li><NavLink to="/user/Destiny" exact activeStyle={{color:'green'}}>User</NavLink></li>

    </ul>

    <Route path="/"  exact strict render={
      () => {
        return (<h1>Welcome Home</h1>);
      }
    } />

    <Route path="/about" exact strict render={
      () => {
        return (<h1>Welcome About</h1>);
      }
    } />

<Route path="/user/:username" exact strict component={User} />

    </div>
  </Router>
 )
}
};


export default App;
