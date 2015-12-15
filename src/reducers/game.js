import { fromJS } from 'immutable';
import { START_GAME } from '../actions/game';
import { Map, List } from 'immutable';

const initialState = Map({
  players: List()
});

export default function(state = initialState, action) {
  switch(action.type) {
    case START_GAME:
      return fromJS(action.game);
    default:
      return state;
  }
}