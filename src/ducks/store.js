import { createStore,applyMiddleware, combineReducers } from 'redux';
import promiseMiddlerware from 'redux-promise-middleware';
import userReducer from './userReducer';
import travelReducer from './travelReducer';



const rootReducer = combineReducers({
    travelReducer,
    userReducer 
})
export default createStore(rootReducer, applyMiddleware(promiseMiddlerware));
