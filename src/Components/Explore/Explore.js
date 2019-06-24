import React, { Component }  from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { setToggle } from '../../ducks/toggleReducer';
import { setUser } from '../../ducks/userReducer';
import { allDestinations, addToList  } from '../../ducks/travelReducer';
import HillSide from '../../images/HillSide.jpeg';
import Location from '../../images/Location.svg';
import './Explore.scss';


class Explore extends Component {
 constructor(props){
     super(props)
     this.state = {
     
     }
 }


handleChange(value){
    this.setState({
        userInput: value

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

 
render(){

    const mappedUserDestination = this.props.travelReducer.Destinations.map((place, index) => (
       
       
        // console.log(place),
      <div className="red-red" key = {index}>
      
        <div className="info">

            <img src={place.image_url} alt="location"/>
              <p className="card-name">{place.destination}</p>
              <p className="card-subtitle">{place.country}: {place.destination}</p>
            <button  className="card-button" onClick={()=> this.addDestination(place.destination_id)}>Add</button>
            
             
        </div>
    </div>
    ))

    return ( 
    <div> 
    
        <div className="section">
            <img className="header-img" src={HillSide} alt="BlueOcean" />
        
            <div className="section-container">
                <h3>Choose Your Destination</h3>
                <hr/>
                <div className="search-bar">
                
                    <select value={this.state.option} onChange={(e) => {
                        this.setState({
                            option: e.target.value
                        })
                    }}>
                         <option value="">Select Continent</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                    </select>

                    <input placeholder="Country" onChange={(e) => this.handleChange(e.target.value)}/>
                       
                            <button id="search" onClick={this.getData}>Search</button>
                     
                </div>
        
            </div>
            {/* end of section container */}

            <div className="red">{mappedUserDestination}</div>
            <footer></footer>
        </div>
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
    setToggle,
    setUser 
}

const invokedConnect = connect(
    mapStateToProps,
    mapDispatchToProps 
)
    export default invokedConnect(Explore)




    

// / const { REACT_APP_API_KEY } = process.env


// class TravelBook extends Component {
//     constructor(props){
//     super(props)
//     this.state = {
//         // dataEurope: [],
//         // dataAfrica: [],
//         // dataIndia: []
//     }
//     }
    
    



//  componentDidMount(){
//     this.getEuropeData()
//     this.getAfricaData()
//     this.getIndiaData()

//  }

// template string for filtering 

//  getEuropeData = () => {
//     axios.get('https://api.sygictravelapi.com/1.1/en/places/list?query=Europe&limit=5', {
//         headers: {
//            "x-api-key":  REACT_APP_API_KEY
//         }
//        }).then(res => {
    
//            this.setState({
//             dataEurope: res.data.data.places
//            })
//            console.log(res.data.data.places)
//        })
//  }

//  getAfricaData = () => {
//     axios.get('https://api.sygictravelapi.com/1.1/en/places/list?query=Africa&limit=5', {
//         headers: {
//            "x-api-key":  REACT_APP_API_KEY
//         }
//        }).then(res => {
    
//            this.setState({
//             dataAfrica: res.data.data.places
//            })
//            console.log(res.data.data.places)
//        })
//  }

//  getIndiaData = () => {
//     axios.get('https://api.sygictravelapi.com/1.1/en/places/list?query=India&limit=5', {
//         headers: {
//            "x-api-key":  REACT_APP_API_KEY
//         }
//        }).then(res => {
    
//            this.setState({
//             dataIndia: res.data.data.places
//            })
//            console.log(res.data.data.places)
//        })
//  }


// render(){

    // const mappedEuropeData = this.state.dataEurope.map(place => (
    //     <div key = {place.id}>
    //         <h3>{place.name}</h3>
    //         <h3>{place.perex}</h3>
    //     </div>
    // ))

    // const mappedAfricaData = this.state.dataAfrica.map(place => (
    //     <div key = {place.id}>
    //         <h3>{place.name}</h3>
    //         <h3>{place.perex}</h3>
    //     </div>
    // ))

    // const mappedIndiaData = this.state.dataIndia.map(place => (
    //     <div key = {place.id}>
    //         <h3>{place.name}</h3>
    //         <h3>{place.perex}</h3>
    //     </div>
    // ))


//     return(
//     <div>
//         <h1>TravelBook</h1>
//         {/* {mappedEuropeData}
//         {mappedAfricaData}
//         {mappedIndiaData } */}
//     </div>


// ) 
// }}

// const mapStateToProps = (reduxState) => {
//     return reduxState;
// }

// const mapDispatchToProps = {
//     // fetchItems
// }
// const invokedConnect = connect(
//     mapStateToProps,
//     mapDispatchToProps 
// )
// export default invokedConnect(TravelBook)







// import React, { Component } from 'react';
// import axios from 'axios';
// import {connect} from 'react-redux';
// import { setUserDestination } from '../../ducks/travelReducer';
// import './TravelBook.scss';
// import HillSide from '../../images/HillSide.jpeg';


// const { REACT_APP_API_KEY } = process.env

// class TravelBook extends Component {
//     constructor(props){
//         super(props) 
//         this.state = {
//             locations: [],
//             userInput: ""
//         }
//     }

//     componentDidMount(){
//         this.getAllLocations()
//     }

//     handleChange(value){
//         this.setState({
//             userInput: value
//         })
//     }

//     getData = () => {
//         axios.get(`https://api.sygictravelapi.com/1.1/en/places/list?limit=10&query=${this.state.userInput}`, {
//         headers: {
//            "x-api-key":  REACT_APP_API_KEY
//         }
//        }).then(res => {
//             console.log('got response')
//            this.props.setUserDestination({
//             userInput: res.data.data.places
//            })
//            console.log(res.data.data.places)
//        })
//     }

//     getAllLocations() {
//     axios.get('/api/travelbook/explore').then(res => {
//         this.setState({
//             locations: res.data
//         })
//         console.log(res.data)
//     }).catch(error => console.log('GET ALL',error))
//     }
//     render(){
//       const mappedgetAllLocations = this.state.locations.map( locations => (
//           <div key={locations.location_id}>
//               <div className="popular-box">
//                 <img className="card" src={locations.image_url} alt='location'/>
//                 <div className="card-info">
//                      <h2 className="card-name">{locations.name}</h2>
//                      <button className="card-button">Add</button>
//                      <p className="card-p">{locations.description}</p>
//                 </div>
//               </div>
//           </div>
//       ))
//     return (
//     <div> 
    
//         <div className="section">
//             <img className="header-img" src={HillSide} alt="BlueOcean" />
        
//         <div className="section-container">
        
//                 <h3>Choose Your Destination</h3>
//                 <hr/>
//             <div className="search-bar">
//                     <input placeholder="Destination" onChange={(e) => this.handleChange(e.target.value)}/>
                
//                     {/* <select>
//                         <option value="shopping">Shopping</option>
//                         <option value="eating">Resturants</option>
//                         <option value="sports">Sports</option>
//                         <option value="discovering">Discoveries</option>
//                         <option value="going_out">NightLife</option>
//                         <option value="siteseeing">Siteseeing</option>
//                     </select> */}
            
//                     <button id="search" onClick={this.getData}>Search</button>
//             </div>
//         </div>
//     </div> 

//         <h1 className="popular-section">Popular Destination</h1>
//          <hr className="popular-line"/>
//         <div>{mappedgetAllLocations}</div>
        
//     </div>

//     )}

// }

// const mapStateToProps = (reduxState) => {
//     return reduxState
// }
// const mapDispatchToProps = {
//     setUserDestination 
// }

// const invokedConnect = connect(
//     mapStateToProps,
//     mapDispatchToProps 
// )
//     export default invokedConnect(TravelBook)






     


