import { createStore,applyMiddleware, combineReducers } from 'redux';
import promiseMiddlerware from 'redux-promise-middleware';
import userReducer from './userReducer';
import travelReducer from './travelReducer';
import toggleReducer from "./toggleReducer"



const rootReducer = combineReducers({
    travelReducer,
    userReducer, 
    toggleReducer
})
export default createStore(rootReducer, applyMiddleware(promiseMiddlerware));
