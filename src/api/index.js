import {
  _getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer,
} from './_DATA';

export function getUsers() {
  return _getUsers();
}

export function getQuestions() {
  return _getQuestions();
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer(answerObj) {
  return _saveQuestionAnswer(answerObj);
}
