import { combineReducers } from "redux";
import propertiesReducer from "./propertiesReducer";
import userReducers from './userReducer'


export default combineReducers({
    propiedades: propertiesReducer,
    user: userReducers
}) 