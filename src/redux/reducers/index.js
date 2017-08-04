import { combineReducers } from 'redux';
import * as homeReducer from './home'
import * as loginReducer from './login'
import * as trophyReducer from './trophies'

const appReducer = combineReducers(Object.assign(
  homeReducer,
  loginReducer,
  trophyReducer
));

export default appReducer

