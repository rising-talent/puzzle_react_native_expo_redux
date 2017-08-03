import { combineReducers } from 'redux';
import * as homeReducer from './home'
import * as loginReducer from './login'
const appReducer = combineReducers(Object.assign(
  homeReducer,
  loginReducer,
));

export default appReducer

