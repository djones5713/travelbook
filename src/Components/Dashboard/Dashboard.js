import React, { Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { removeFromList, updateList } from '../../ducks/travelReducer';
import { setUser } from '../../ducks/userReducer';

class  Dashboard extends Component{
constructor(props){
super(props)
  this.state = {
     Date: null
  }
}

handleChange(value){
    this.setState({
        Date: value

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
    const {userList} = this.props.travelReducer
    const mappedUserDestination = userList.map((list, index) => {
        return(
            <div key={index}>
                 <input onChange={(e) =>this.handleChange(e.target.value)}/>
                 <button onClick={()=> this.updateDestination(list.id, this.state.Date)}>Submit</button>
                 <div>{list.destination_id}</div>
                 <img src={list.image_url} alt="location"/>
                 <button onClick={() => this.deleteDestination(list.id)}>Delete</button>

            </div>
        )
        })


    return (
        <div>{ mappedUserDestination }</div>
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