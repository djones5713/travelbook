import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { allDestinations, addToList } from '../../../ducks/travelReducer';
import { setUser } from '../../../ducks/userReducer';


class Feed extends Component {
    constructor(props){
    super(props)
    this.state = {

    }
 }

 componentDidMount(){
    // this.props.allDestinations(this.props.travelReducer.Destinations)
    this.getData()
 }


 getData = () => {
    const { userInput } = this.state
    console.log(this.state.option)
    console.log(userInput)
    axios.get(`/api/travelbook/destinations/${this.state.option}/${userInput}`)
    .then(res => {
        console.log('got response')
       this.props.allDestinations(res.data)
       console.log(res.data)
   })

}

addDestination = (destination_id, country, image_url) => {
    
    console.log(this.props)
    const { user_id } = this.props.userReducer.user
    console.log(user_id)
    console.log(destination_id)
    axios.post('/api/travelbook/user-destinations-list', {destination_id, user_id, country, image_url})
    .then(res =>{
        this.props.addToList(res.data)
        console.log('DATA',res.data)
    })
}


 render(){

    const mappedUserDestination = this.props.travelReducer.Destinations.map((place, index) => (

        <div className="red-red" key = {index}>
        
          <div className="info">
  
              <img className="Destination" src={place.image_url} alt="location"/>
                <p className="card-name">{place.destination}</p>
                <p className="card-subtitle"><img  className="location" src={Location} alt='location'/>{place.country}: {place.destination}</p>
              <button  className="card-button" onClick={()=> this.addDestination(place.destination_id)}>Add</button>
              
               
          </div>
      </div>
      ))

     return(
         <div className="red">
             {mappedUserDestination}
         </div>
     )
 }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}
const mapDispatchToProps = {
    allDestinations,
    addToList,
    setUser
}

const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps 
)

export default invokedConnect(Feed)

