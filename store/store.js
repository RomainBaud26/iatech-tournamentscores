import {createStore, combineReducers } from "redux";
import reducerCategories from './reducerCategories'


const rootReducer = combineReducers({
  tournaments: reducerCategories
});


export default createStore(rootReducer);
