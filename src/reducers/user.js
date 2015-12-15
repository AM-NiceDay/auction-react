import { CREATE_USER } from '../actions/user';

export default function(state = 'unknown', action) {
  switch(action.type) {
    case CREATE_USER:
      return action.name;
    default:
      return state;
  }
}
