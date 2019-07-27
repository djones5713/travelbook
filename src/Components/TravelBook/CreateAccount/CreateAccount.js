import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../../ducks/userReducer';
import '../CreateAccount/CreateAccount.scss'


class CreateAccount extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            email: "",
            Redirect: false

        }
    }

    componentDidMount(){
        this.accountHandler()
    }
    

    accountHandler = (prop, value) =>{
        this.setState({
            [prop]: value
        })
    }


    createAccount = () => {
        const { username, password, email } = this.state;
        if(!username || !password || !email) {
            return alert('Fill Complete The Form')
        }
        axios.post('/api/travelbook/create-account', { username, password, email }).then(res => {
            this.setState({ username: '', password: ''})
            this.props.setUser(res.data);
            this.setState({
                Redirect: true
            })
        }).catch((err) => {console.log("LOGIN", err)})
       
    }
  
    render(){
        const { username, email, password } = this.state;
        // const { user } = this.props.userReducer;
        if(this.state.Redirect){
            return <Redirect to='/explore' />
        }

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
                            type="username"
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
                            
                            type="email"
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
                            
                            type="password"
                            value={password}
                            name="password"
                           
                            />
                        </div>
                        
                        
                       
                            <button className="signin-button" onClick={this.createAccount}>Create Account </button>
                      

                        <Link to="/signin" style={{ color: 'white', textDecoration: 'none'}}>
                            <button className="create-button">signin</button>
                        </Link>

                        

                        <p><a href="http://localhost:3000/signin">Do you have an account?</a></p> 
                        
                    </div>
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

// Refactoring note create new object because mapStateToProps pulls everything from redux 
export default invokedConnect( CreateAccount)
