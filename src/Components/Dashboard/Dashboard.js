import React, { Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { removeFromList, updateList } from '../../ducks/travelReducer';
import { setUser } from '../../ducks/userReducer';
import ImagesUpload from '../Dashboard/ImageUpload';
import '../Dashboard/Dashboard.scss';
import { FaMinusSquare } from 'react-icons/fa';


class  Dashboard extends Component{
constructor(props){
super(props)
  this.state = {
     Date: null,
  
  }
}

handleChange(value){
    this.setState({
        Date: value

    })
}

componentDidMount(){
    axios.get('/api/travelbook/user').then(res => {
        this.props.setUser(res.data)
    })

}

updateDestination = (id, date) => {
    const { user_id } = this.props.userReducer.user
    console.log(id)
    console.log('hit')
    axios.put(`/api/travelbook/user-destinations/${id}/${user_id}?date=${date}`)
    .then(res => {
        console.log('hit')
        console.log(this.props)
        this.props.updateList(res.data)
        console.log('HIT',res.data)
    })
}

deleteDestination = (id) => {

    const { user_id } = this.props.userReducer.user
    console.log(id)
    console.log('hit')
    axios.delete(`/api/travelbook/user-destinations/${id}/${user_id}`)
    .then(res => {
        console.log('hit')
        console.log(this.props)
        this.props.removeFromList(res.data)
        console.log('HIT',res.data)
    })
}


getUserDestination = () => {
    axios.get('/api/travelbook/user-destinations')
    .then(res => {
        console.log('hit')
        this.props.setUser(res.data)
        this.props.removeFromList(res.data)
        console.log('HIT',res.data)
    })
}


getUserDestination = () => {
    axios.get('/api/travelbook/user-destinations')
    .then(res => {
        console.log('hit')
        this.props.setUser(res.data)
        this.props.updateList(res.data)
        console.log('HIT',res.data)
    })
}



render(){
    console.log(this.props.userReducer, 'Hi I am user')
    console.log(this.props.travelReducer, "travel reducer")
    const {userList} = this.props.travelReducer;
    const mappedUserDestination = userList.map((list, index) => {
        return(
            <div className="main-info" key={index}>
                <div  className="card-trash" onClick={() => this.deleteDestination(list.id)}><FaMinusSquare /></div>
                 <div className="about-info">
                 <img className="card-img" src={list.image_url} alt="location"/>
                 <p className="card-p" >{list.description}</p>
                 </div>
                 <div className="submit">
                 <p className="submit-date">{list.date}</p>
                 <input className="submit-input" onChange={(e) =>this.handleChange(e.target.value)}/>
                 <button className="submit-button" onClick={()=> this.updateDestination(list.id, this.state.Date)}>Submit</button> 
                 </div>
            </div>
        )
        })

    

    return (
        <div className="dashboard">
        <div className="container">
            <ImagesUpload />
        </div>

        <div>
            <div className="userlist">{ mappedUserDestination }</div>
        </div>
       
        </div>
    )
}}

const mapStateToProps = (reduxState) => {
    return reduxState
}

const mapDispatchToProps = {
  removeFromList,
  setUser,
  updateList 
}

const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps 
)

export default invokedConnect(Dashboard)