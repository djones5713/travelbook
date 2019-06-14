
const initalState = {
    places: { }
}


const FETCH_ITEMS = "FETCH_ITEMS"

export default function (state = initalState, action){
    switch(action.type){
        case FETCH_ITEMS:
            return {
                ...state,
                places: action.payload
            }
        default:
            return state;
    }
}

// export  const fetchItems = () => (dispatch) => {
//     console.log('fetching')
//     fetch('https://api.sygictravelapi.com/1.1/en/places/list')
//     .then(res => res.json())
//     .then(places => dispatch({
//         type: FETCH_ITEMS,
//         payload: places
//     }));
    
// }



