import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../duck/reducer';

function UserLinks ({ logout }) {
    return(
            <div>
                <div>
                    <ul>
                        <li><Link to="/explore" exact activeStyle={{color:'green'}} >Explore</Link></li>
                        <li><Link to="/dashboard" exact activeStyle={{color:'green'}}> Dashboard</Link></li>
                    </ul>
                </div>
                <button onClick={logout}>Logout</button>
            </div> 
    )
}

class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",

        }
    }

    accountHandler = (prop, value) =>{
        this.setState({
            [prop]: value
        })
    }


    createAccount = () => {
        const { username, password, email } = this.state;
        axios.post('/api/travelbook/create-account', { username, password, email }).then(res => {
       
            this.setState({ username: '', password: ''})
            this.props.setUser(res.data);
        }).catch((err) => {console.log("LOGIN", err)})
    }

    login = () => {
        const { username, password } = this.state;
        axios.post('/api/travelbook/login', { username, password }).then((res) => {
            this.props.setUser(res.data);
        })
    }

    logout = () => {
        axios.get('/api/travelbook/login').then(res => {
            this.props.setUser(null);
        })
    }

    render(){
        const { username, password } = this.state;
        const { user } = this.props;
        return (
            <div> 
                {!user ? (
                    <div>
                        <div>
                            username: {" "}
                            <input
                            onChange={e => 
                                this.accountHandler(e.target.name, e.target.value)
                            }
                            value={username}
                            name="username"
                            />
                        </div>
                        <div>
                            password: {" "}
                            <input
                            onChange={e => 
                                this.accountHandler(e.target.name, e.target.value)
                            }
                            value={password}
                            name="password"
                            />
                        </div>
                        <div>
                            <button onClick={this.login}>SignIn</button>
                        </div>
                    </div>

                ) : (
                    < UserLinks logout={this.logout} />
                    )}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

const mapDispatchToProps = {
    setUser
}
const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps 
)
export default invokedConnect(SignIn)

