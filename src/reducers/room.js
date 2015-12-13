import { CREATE_ROOM, JOIN_ROOM } from '../actions/room';

export default function(state = { players: [] }, action) {
  switch(action.type) {
    case CREATE_ROOM:
      return {
        owner: action.owner,
        players: []
      };
    case JOIN_ROOM:
      return {
        owner: state.owner,
        players: [
          ...state.players,
          action.player
        ]
      };
    default: return state;
  }
}