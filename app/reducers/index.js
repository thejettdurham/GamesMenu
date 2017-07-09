import { combineReducers } from 'redux';
import * as appReducer from './app'

// Aggregate all reducers from imports
export default combineReducers(Object.assign(
  appReducer,
));
