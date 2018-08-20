import { RECEIVE_USERS } from 'constants/ActionTypes';
import { getUsers } from 'api';

function receiveUsersAction(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function receiveUsers() {
  return dispatch => getUsers().then(
    response => dispatch(receiveUsersAction(response)),
    (error) => {
      console.error(error);
      throw error;
    },
  );
}
