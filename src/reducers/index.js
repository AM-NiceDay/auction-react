import { combineReducers } from 'redux-immutablejs';
import room from './room';
import user from './user';
import { Map } from 'immutable';

export default combineReducers(Map({
  room,
  user
}));