import { UPDATE_ROOMS } from '../actions/rooms';
import { List, fromJS } from 'immutable';

export default function(state = List(), action) {
  switch(action.type) {
    case UPDATE_ROOMS:
      return fromJS(action.rooms);
    default: return state;
  }
}