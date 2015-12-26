import { fromJS } from 'immutable';
import { START_GAME, JOIN_GAME, GET_GAME, UPDATE_GAME } from '../actions/game';
import { Map, List } from 'immutable';

const initialState = Map({
  players: List()
});

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_GAME:
      return state.merge(fromJS(action.game));
    default:
      return state;
  }
}