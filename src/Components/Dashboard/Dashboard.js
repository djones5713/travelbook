import React, { Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { removeFromList } from '../../ducks/travelReducer';
import { setUser } from '../../ducks/userReducer';

class  Dashboard extends Component{
constructor(props){
super(props)
  this.state = {
     
  }
}


deleteDestination = (id) => {
    console.log(id)
    console.log('hit')
    axios.delete(`/api/travelbook/user-destinations/${id}`, {id})
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
        this.props.removeFromList(res.data)
        console.log('HIT',res.data)
    })
}



render(){
    console.log(this.props.userReducer, 'Hi I am user')
    console.log(this.props.travelReducer.userList)
    const {userList} = this.props.travelReducer
    const mappedUserDestination = userList[0].map((list, index) => {
        return(
            <div key={index}>
                 <div>{list.data}</div>
                 <div>{list.destination_id}</div>
                 {/* <img src={list.image_url} alt="location"/> */}
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
  setUser
}

const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps 
)

export default invokedConnect(Dashboard)