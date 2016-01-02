import { fromJS } from 'immutable';
import { UPDATE_GAME } from '../actions/game';
import { Map, List } from 'immutable';

const initialState = Map({
  owner: Map(),
  players: List()
});

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_GAME:
      return fromJS(action.game);
    default:
      return state;
  }
}