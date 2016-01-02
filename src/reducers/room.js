import { CREATE_ROOM, JOIN_ROOM, UPDATE_ROOM } from '../actions/room';
import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  owner: Map(),
  players: List()
});

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_ROOM:
      return fromJS(action.room);
    default: return state;
  }
}
