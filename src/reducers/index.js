import { combineReducers } from 'redux-immutablejs';
import room from './room';
import user from './user';
import game from './game';
import { Map } from 'immutable';

export default combineReducers(Map({
  room,
  user,
  game
}));