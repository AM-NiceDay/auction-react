import { CREATE_USER, UPDATE_USER, REMOVE_USER } from '../actions/user';
import { Map, fromJS } from 'immutable';

export default function(state = Map(), action) {
  switch(action.type) {
    case CREATE_USER:
      return fromJS({
        name: action.name
      });
    case UPDATE_USER:
      return fromJS(action.user);
    case REMOVE_USER:
      return Map();
    default:
      return state;
  }
}
