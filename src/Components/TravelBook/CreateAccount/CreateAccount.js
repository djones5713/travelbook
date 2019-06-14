import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/userReducer';


class CreateAccount extends Component {
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


    createAccount = () => {
        const { username, password, email } = this.state;
        axios.post('/api/travelbook/create-account', { username, password, email }).then(res => {
       
            this.setState({ username: '', password: ''})
            this.props.setUser(res.data);
        }).catch((err) => {console.log("LOGIN", err)})
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
                            <button onClick={this.createAccount}>Create Account</button>
                        </div>
                    </div>

                ) : (
                    <div>Hello User</div>
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
export default invokedConnect( CreateAccount)
