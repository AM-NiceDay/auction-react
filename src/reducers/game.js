import { fromJS } from 'immutable';
import { CREATE_ROOM } from '../actions/room';

const initialState = Map({
  players: List()
});

export default function(state = initialState, action) {
  switch(action.type) {
    case CREATE_ROOM:
      return fromJS(action.game);
    default:
      return state;
  }
}