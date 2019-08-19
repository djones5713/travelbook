import React, { Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { removeFromList, updateList } from '../../ducks/travelReducer';
import { setUser } from '../../ducks/userReducer';
import Navbar from '../Navigation/NavBar';
import road from '../../Images/road.jpeg';
import place from '../../Images/place.png';
import '../Dashboard/Dashboard.scss';



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
        this.props.userList(res.data)
        this.props.setUser(res.data)
        this.props.removeFromList(res.data)
        console.log('HIT',res.data)
    })
}


render(){
    console.log(this.props.userReducer, 'Hi I am user')
    console.log(this.props.travelReducer, "travel reducer")
    const {userList} = this.props.travelReducer;
   
   
    const mappedUserDestination = userList.map((list, index) => {
        return(
            <div key={index}>
                <img className="dashboard-slider" src={list.image_url} alt="location"/>
                <button  className="slider-trash" onClick={() => this.deleteDestination(list.id)}>-</button>
                <button className="slider-location" onClick={() => this.setState({ Info: list.destination_id})}><img className="slider-place" src={place} alt="places"/>{list.destination}</button>
       </div>
   )
   })




   const mappedUserDestinationInfo = userList.map((info, index) => {
       return(
           <div className="destination-info" key={index}>
                <div>
                    <h2 className="destination-info-title">{info.destination}</h2>
                    <p className="destination-info-p">{info.country}</p>
                    <p className="destination-info-title">$300</p>
                    <p className="card-p" >{info.description}</p> 
                    <img className="hotel-img" src={info.hotel1} alt='hotel1'/>
                    <img className="hotel-img" src={info.hotel2} alt='hotel1'/>
                    <button className="book-btn">Book Now</button>
                </div>
                <div>
                    <p className="destination-info-rating">{info.rating}/6</p>
                    <img className="destination-slider-info" src={info.image_url} alt="location"/>
                </div>
            
            
                    {/* <div className="submit">
                    <p className="submit-date">{list.date}</p>
                    <input className="submit-input" onChange={(e) =>this.handleChange(e.target.value)}/>
                    <button className="submit-button" onClick={()=> this.updateDestination(list.id, this.state.Date)}>Submit</button> 
                    */}
           </div>
       )
   })



    return (
        <div>
        
            
            <div >
                <Navbar />
                <div className="dashboard-head">
                    <div className="dashboard-box"></div>
                    <img className='road' src={road} alt="winning road" /> 
                    <div className="dashboard-info">
                        <p className='dashboard-p'>Travel To Over 50 Countries Across The Global.</p>
                        <h2 className='dashboard-title'>TravelBook</h2>
                        <button className='dashboard-button'>Explore</button>
                    </div>
                </div>
    
               
            </div>


            <div className="userList">
                <div className="destination-box">
                   <h1 className="destination-title">Destinations</h1>
                   <p className="destination-p">Take a look at your favorite destinations.</p>
                   <button className='destinations-button'>Explore</button>
                </div>
                <div className="dashboard-destinations">{ mappedUserDestination }</div>
            </div>  
           
           <div>
             {mappedUserDestinationInfo}
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