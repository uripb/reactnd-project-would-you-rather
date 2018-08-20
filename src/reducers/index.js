import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import users from './users';
// import authedUser from './authedUser';

export default combineReducers({
  users,
  loadingBar: loadingBarReducer,
});
