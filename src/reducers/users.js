import { RECEIVE_USERS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from 'constants/ActionTypes';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION: {
      const user = state[action.question.author];
      return {
        ...state,
        [user.id]: {
          ...user,
          questions: user.questions.concat(action.question.id),
        },
      };
    }
    case SAVE_QUESTION_ANSWER: {
      const user2 = state[action.authedUser];
      return {
        ...state,
        [user2.id]: {
          ...user2,
          answers: {
            ...user2.answers,
            [action.qid]: action.answer,
          },
        },
      };
    }
    default:
      return state;
  }
}
