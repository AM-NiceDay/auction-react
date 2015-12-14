import { CREATE_ROOM, JOIN_ROOM } from '../actions/room';
import { Map, List } from 'immutable';

const initialState = Map({
  players: List()
});

export default function(state = initialState, action) {
  switch(action.type) {
    case CREATE_ROOM:
      return state.set('owner', action.owner);
    case JOIN_ROOM:
      return state.update('players', players => players.push(action.player));
    default: return state;
  }
}
