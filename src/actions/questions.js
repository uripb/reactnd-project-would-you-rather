import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from 'constants/ActionTypes';
import { getQuestions, saveQuestion, saveQuestionAnswer } from 'api';
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

function answerQuestion(data) {
  return {
    type: SAVE_QUESTION_ANSWER,
    ...data,
  };
}

export function handleQuestions() {
  return (dispatch) => {
    dispatch(showLoading());
    return getQuestions()
      .then(
        response => dispatch(receiveQuestions(response)),
        (error) => {
          // eslint-disable-next-line
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

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then(question => dispatch(addQuestion(question)));
  };
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    const saveData = {
      qid,
      answer,
      authedUser,
    };

    return saveQuestionAnswer(saveData)
      .then(() => dispatch(answerQuestion(saveData)))
      .then(() => dispatch(hideLoading()));
  };
}
