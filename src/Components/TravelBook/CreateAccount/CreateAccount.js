import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/userReducer';
import '../CreateAccount/CreateAccount.scss'


class CreateAccount extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            email: ""

        }
    }

    componentDidMount(){
        this.createAccount()
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
        const { user } = this.props.userReducer;
        console.log(this.props, "USER")
        return (
            <div className="signin-container"> 
               
                    <div className="signin-form">
                        <h1 className="signin-title">Create Account</h1>
                        <div>
                           
                            <input
                            placeholder="username"
                            onChange={e => 
                                this.accountHandler(e.target.name, e.target.value)
                            }
                            value={username}
                            name="username"
                            />
                        </div>
                
                        <div>
                            <input
                            placeholder="email"
                            onChange={e => 
                                this.accountHandler(e.target.name, e.target.value)
                            }
                            value={email}
                            name="email"
                            />
                        </div>
                        <div>
                            <input
                            placeholder="password"
                            onChange={e => 
                                this.accountHandler(e.target.name, e.target.value)
                            }
                            value={password}
                            name="password"
                            />
                        </div>
                        <Link to="/explore" style={{ color: 'white', textDecoration: 'none'}}>
                            <button className="signin-button" onClick={this.createAccount}>Create Account </button>
                        </Link>

                        <p><a href="http://localhost:3000/signin">Do you have an account?</a></p> 
                        
                    </div>

                    {!user ? (
                        <Link to="/create-account" style={{ color: 'white', textDecoration: 'none'}}></Link>
                    ) : (
                         <Link to="/explore" style={{ color: 'white', textDecoration: 'none'}}></Link>
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
