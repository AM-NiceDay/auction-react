import { combineReducers } from 'redux-immutablejs';
import room from './room';
import { Map } from 'immutable';

export default combineReducers(Map({
  room
}));