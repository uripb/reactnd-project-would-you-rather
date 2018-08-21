import { RECEIVE_QUESTIONS } from 'constants/ActionTypes';
import { getQuestions } from 'api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

function receiveQuestionsAction(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function receiveQuestions() {
  return (dispatch) => {
    dispatch(showLoading());
    getQuestions()
      .then(
        response => dispatch(receiveQuestionsAction(response)),
        (error) => {
          console.error(error);
          throw error;
        },
      )
      .then(() => dispatch(hideLoading()));
  };
}
