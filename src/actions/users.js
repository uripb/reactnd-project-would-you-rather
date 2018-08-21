import { RECEIVE_USERS } from 'constants/ActionTypes';
import { getUsers } from 'api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

function receiveUsersAction(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function receiveUsers() {
  return (dispatch) => {
    dispatch(showLoading());

    return getUsers()
      .then(
        response => dispatch(receiveUsersAction(response)),
        (error) => {
          console.error(error);
          throw error;
        },
      )
      .then(() => dispatch(hideLoading()));
  };
}
