import { RECEIVE_QUESTIONS, ADD_QUESTION } from 'constants/ActionTypes';
import { getQuestions, saveQuestion } from 'api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleQuestions() {
  return (dispatch) => {
    dispatch(showLoading());
    return getQuestions()
      .then(
        response => dispatch(receiveQuestions(response)),
        (error) => {
          console.error(error);
          throw error;
        },
      )
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}
