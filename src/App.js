import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../src/ducks/userReducer';
import { setToggle } from '../src/ducks/toggleReducer';
import TravelBook from './Components/TravelBook/TravelBook';
import About from './Components/TravelBook/About/About';
import SignIn from './Components/TravelBook/SignIn/SignIn';
import Dashboard from './Components/Dashboard/Dashboard';
import Explore from './Components/Explore/Explore';
import Search from './Components/TravelBook/Search/Search';
import CreateAccount from './Components/TravelBook/CreateAccount/CreateAccount';
import './App.scss';



class App extends Component {
    

    
    logout = () => {
        axios.get('/api/travelbook/logout').then(res => {
            this.props.setUser(null);
        })
    }
  

render(){
    const { user } = this.props.userReducer;
    // const { toggle } = this.props.toggleReducer;
    console.log(user)
    console.log(this.props)
    
    return (
       
    <div className="App" >

        {/* {!user ?(
            <ul>
                <li><Link to="/" style={{ color: 'white', textDecoration: 'none'}}  >Travel Book</Link></li>
                <li><Link to="/signin" style={{ color: 'white', textDecoration: 'none'}}  >SignIn</Link></li>
                <li><Link to="/create-account" style={{ color: 'white', textDecoration: 'none'}} >Create Account</Link></li>
            </ul>
            ) : (
            <ul>
                <li><Link to="/explore" style={{ color: 'white', textDecoration: 'none'}} >Explore</Link></li>
                <li><Link to="/dashboard" style={{ color: 'white', textDecoration: 'none'}} >Dashboard</Link></li>
                <Link  to="/" >
                <button className="logout" onClick={this.logout}>Logout</button>
                </Link>
            </ul>   
            )
        }
         */}

            <Switch>
                <Route path="/travelbook"  exact strict component={TravelBook} />
                <Route path="/about" exact strict component={About} />
                <Route path="/signin" exact strict component={SignIn} />
                <Route path="/create-account" exact strict component={CreateAccount} />
                <Route path="/explore"  exact strict component={Explore} />
                <Route path="/dashboard" exact strict component={Dashboard} />
                <Route path="/" exact strict component={Search} />
        
            </Switch>
        
       
    </div>

    )}
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const mapDispatchToProps = {
    setUser,
    setToggle
}

const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)


export default invokedConnect(App); 
