
const initalState = {
    userDestination: { }
}


const FETCH_DESTINATIONS = "FETCH_DESTINATIONS"

export default function (state = initalState, action){
    switch(action.type){
        case FETCH_DESTINATIONS:
            return {
                ...state,
                userDestination: action.payload
            }
        default:
            return state;
    }
}


export function setUserDestination(userDestination){
    return {
        type: FETCH_DESTINATIONS,
        payload: userDestination
    }
}


