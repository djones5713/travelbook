import React from 'react';
// import { connect } from 'react-redux';
// import axios from 'axios';
import './Explore.scss';


function Explore () {
  return <div>Explore</div>

}
export default Explore


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



