import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
// import authedUser from './authedUser';

export default combineReducers({
  // authedUser,
  loadingBar: loadingBarReducer,
});
