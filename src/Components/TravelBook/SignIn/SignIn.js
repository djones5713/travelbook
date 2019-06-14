import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/userReducer';


class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",

        }
    }

    accountHandler = (prop, value) =>{
        this.setState({
            [prop]: value
        })
    }

    login = () => {
        const { email, password } = this.state;
        axios.post('/api/travelbook/login', { email, password }).then((res) => {
            this.props.setUser(res.data);
        })
    }



    render(){
        const { email, password } = this.state;
        const { user } = this.props;
        return (
            <div> 
                {!user ? (
                    <div>
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
                            <button onClick={this.login}>SignIn</button>
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
export default invokedConnect(SignIn)

