import { CREATE_ROOM } from '../actions/room';

export default function(state = {}, action) {
  switch(action.type) {
    case CREATE_ROOM: {
      return {
        owner: action.owner
      }
    }
    default: return state;
  }
}