import { fromJS } from 'immutable';
import { UPDATE_GAME, GAME_REMOVED } from '../actions/game';
import { Map, List } from 'immutable';

const initialState = Map({
  owner: Map(),
  players: List(),
  playersStats: Map(),
  things: List(),
  playersPoints: Map()
});

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_GAME:
      return fromJS(action.game);
    case GAME_REMOVED:
      return initialState;
    default:
      return state;
  }
}