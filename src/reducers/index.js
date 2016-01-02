import { combineReducers } from 'redux-immutablejs';
import room from './room';
import rooms from './rooms';
import user from './user';
import game from './game';
import { Map } from 'immutable';

export default combineReducers(Map({
  room,
  rooms,
  user,
  game
}));