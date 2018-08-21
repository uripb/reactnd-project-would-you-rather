import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { QuestionItem } from 'components';
import './styles.scss';

class QuestionsTab extends Component {
  renderQuestions() {
    const { questions, users, user } = this.props;

    return questions.map(
      question => (user === null
        || question.optionOne.votes.includes(user)
        || question.optionTwo.votes.includes(user) ? (
          <QuestionItem key={question.id} question={question} user={users[question.author]} />
        ) : (
          ''
        )),
    );
  }

  render() {
    return <div className="tab-content">{this.renderQuestions()}</div>;
  }
}

QuestionsTab.defaultProps = {
  questions: [],
  users: [],
  user: null,
};

QuestionsTab.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string,
      id: PropTypes.string.isRequired,
      optionOne: PropTypes.shape({
        text: PropTypes.string.isRequired,
        votes: PropTypes.arrayOf(PropTypes.string),
      }),
      optionTwo: PropTypes.shape({
        text: PropTypes.string.isRequired,
        votes: PropTypes.arrayOf(PropTypes.string),
      }),
      timestamp: PropTypes.number,
    }),
  ),
  users: PropTypes.objectOf(
    PropTypes.shape({
      answers: PropTypes.shape({}),
      avatarURL: PropTypes.string,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  user: PropTypes.string,
};

export default QuestionsTab;
