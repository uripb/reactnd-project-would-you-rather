import React from 'react';
import PropTypes from 'prop-types';
import { QuestionItem, QuestionItemDetail } from 'components';
import './styles.scss';

const QuestionsTab = ({ questions, users, onViewPollClick }) => (
  <div className="tab-content">
    {questions.map(question => (
      <QuestionItem key={question.id} user={users[question.author]}>
        <QuestionItemDetail question={question} onViewPollClick={onViewPollClick} />
      </QuestionItem>
    ))}
  </div>
);

QuestionsTab.defaultProps = {
  questions: [],
  users: [],
  onViewPollClick: () => null,
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
  onViewPollClick: PropTypes.func,
};

export default QuestionsTab;
