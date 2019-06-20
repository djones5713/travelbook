const initialState = {
    toggle: false
}

const SET_TOGGLE = "SET_TOGGLE";

export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_TOGGLE:
            return { ...state, toggle: action.payload };
        default: 
            return state;
    }
}

export function setToggle(toggle){
    return {
        type: SET_TOGGLE,
        payload: toggle
    }
}