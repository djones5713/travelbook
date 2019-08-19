import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../../ducks/userReducer';
import './NavBar.scss';
class NavBar extends Component {
    constructor(){
    super()
    this.state = {
        
    }
    }
    render(){
        const { user } = this.props.userReducer
        return (
            <div>

                {!user ?(
                    <ul className="navbar">
                           <li className="nav"><Link to="/explore" style={{ color: 'white', textDecoration: 'none'}}>Explore</Link></li>
                        <li className="nav"><Link to="/signin" style={{ color: 'white', textDecoration: 'none'}}  >SignIn</Link></li>
                        <li className="nav"><Link to="/create-account" style={{ color: 'white', textDecoration: 'none'}} >Create Account</Link></li>
                    </ul>
                    ) : (
                    <ul className="navbar">
                        <li className="nav"><Link to="/explore" style={{ color: 'white', textDecoration: 'none'}}>Explore</Link></li>
                        <li className="nav"><Link to="/dashboard" style={{ color: 'white', textDecoration: 'none'}} >Dashboard</Link></li>
                        <Link  to="/" >
                        <button className="logout" onClick={this.logout}>Logout</button>
                        </Link>
                    </ul>   
                    )
                }
         
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const mapDispatchToProps = {
    setUser
}

const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)


export default invokedConnect(NavBar); 

