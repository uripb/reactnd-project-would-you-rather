import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from 'constants/ActionTypes';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: {
          ...action.question,
        },
      };
    case SAVE_QUESTION_ANSWER: {
      const question = state[action.qid];
      question[action.answer].votes.push(action.authedUser);
      return {
        ...state,
        [action.qid]: question,
      };
    }
    default:
      return state;
  }
}
