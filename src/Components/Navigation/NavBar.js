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
        const { toggle } = this.state
        return (
            <div>
                <button className="nav-button" >Menu</button>
                {!user ?(
                    <nav>
                        <ul className="navbar">
                            <li className="navLink"><Link to="/explore" style={{ color: 'white', textDecoration: 'none'}}>Explore</Link></li>
                            <li className="navLink"><Link to="/signin" style={{ color: 'white', textDecoration: 'none'}}  >SignIn</Link></li>
                            <li className="navLink"><Link to="/create-account" style={{ color: 'white', textDecoration: 'none'}} >Create Account</Link></li>
                    </ul>
                    </nav>
                    ) : (
                    <nav className={toggle ? 'show' : ""}>
                        <ul className="navbar">
                            <li className="navLink"><Link to="/explore" style={{ color: 'white', textDecoration: 'none'}}>Explore</Link></li>
                            <li className="navLink"><Link to="/dashboard" style={{ color: 'white', textDecoration: 'none'}} >Dashboard</Link></li>
                            <Link  to="/" >
                            <button className="logout" onClick={this.logout}>Logout</button>
                            </Link>
                        </ul> 
                    </nav>  
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

