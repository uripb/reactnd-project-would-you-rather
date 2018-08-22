import { SET_AUTHED_USER, CLEAR_AUTHED_USER } from 'constants/ActionTypes';

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
    case CLEAR_AUTHED_USER:
      return action.id;
    default:
      return state;
  }
}
