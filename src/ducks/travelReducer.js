
const initalState = {
    Destinations: [],
    userInput: '',
    userList: []
}


const ALL_DESTINATIONS = "FETCH_DESTINATIONS"
const SET_INPUT = "SET_INPUT"
const ADD_LIST = "ADD_LIST"
const REMOVE_PLACE = "REMOVE_PLACE"

export default function reducer(state = initalState, action){
    switch(action.type){
        case ALL_DESTINATIONS:
            return {
                ...state,
                Destinations: action.payload
            }
        case ADD_LIST:
            return {
                ...state,
                userList: action.payload
            }
        case REMOVE_PLACE:
            return {
                ...state,
                userList:  action.payload
            }
        default:
            return state;
    }
}


export function allDestinations(Destinations){
    return {
        type: ALL_DESTINATIONS,
        payload: Destinations
    }
}
export function setUserInput(info){
    return {
        type: SET_INPUT,
        payload: info
    }
}
export function addToList(place){
    return {
        type: ADD_LIST,
        payload: place
    }
}

export function removeFromList(list){
    return {
        type: REMOVE_PLACE,
        payload: list
    }
}
