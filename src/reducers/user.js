import { CREATE_USER, UPDATE_USER } from '../actions/user';
import { fromJS } from 'immutable';

export default function(state = 'unknown', action) {
  switch(action.type) {
    case CREATE_USER:
      return fromJS({
        name: action.name
      });
    case UPDATE_USER:
      return fromJS(action.user);
    default:
      return state;
  }
}
