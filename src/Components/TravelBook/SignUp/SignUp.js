import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../duck/reducer';

class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            email: ""

        }
    }

    accountHandler = (prop, value) =>{
        this.setState({
            [prop]: value
        })
    }

    register = () => {
        const { username, password, email } = this.state;
        axios.post('/api/travelbook/register', { username, password, email }).then((res) => {
            this.props.setUser(res.data);
        })
    }

    login = () => {
        const { username, password } = this.state;
        axios.post('/api/travelbook/login', { username, password }).then((res) => {
            this.props.setUser(res.data);
        })
    }


    render(){
        const { username, email, password } = this.state;
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
                            email: {" "}
                            <input
                            onChange={e => 
                                this.accountHandler(e.target.name, e.target.value)
                            }
                            value={email}
                            name="email"
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
                            <button onClick={this.register}>Create Account</button>
                            <button onClick={this.login}>SignIn</button>
                        </div>
                    </div>

                ) : (
                    <div><h1>eeh4</h1></div>
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
export default invokedConnect(SignUp)

