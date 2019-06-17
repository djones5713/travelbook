import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/userReducer';
import './SignIn.scss';


class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    accountHandler = (prop, value) =>{
        console.log('VALUE')
        this.setState({
            [prop]: value
           
        })
    }

    login = () => {
        const { email, password } = this.state;
        console.log(this.state)
        axios.post('/api/travelbook/login', { email, password }).then((res) => {
            this.props.setUser(res.data);
            console.log(res.data)
        }).catch(err => {
            console.log('axios not working ', err)
        })
       
    }



    render(){
        const { email, password } = this.state;
        const { user } = this.props.userReducer;

        return (
            <div className="signin-container"> 
                {!user ? (
                    <form className="signin-form">
                       <h1 className="signin-title">SignIn</h1>
                        <div >
                            <input
                             placeholder="email"
                            onChange={(e) => 
                                this.accountHandler(e.target.name, e.target.value)
                            }
                            type="email"
                            value={email}
                            name="email"
                            />
                        </div>
                        <div>
                            <input
                            placeholder="password"
                            onChange={(e) => 
                                this.accountHandler(e.target.name, e.target.value)

                            }
                            type="current-password"
                            value={password}
                            name="password"
                            />
                        </div>
                        <div>
                            
                            <button className="signin-button" onClick={this.login}>SignIn</button>
                           
                        </div>
                    </form>
                  
                     ) : (
                        <div className="Warning">Hello User</div>
                    )
                }
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
