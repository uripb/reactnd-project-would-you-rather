import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import QuestionBoxResult from '../question-box-result';
import './styles.scss';

class QuestionItemResults extends PureComponent {
  render() {
    const { question, answer } = this.props;
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

    return (
      <div className="question-item-results">
        <h5 className="card-title">Results</h5>
        <QuestionBoxResult
          text={question.optionOne.text}
          votes={question.optionOne.votes.length}
          totalVotes={totalVotes}
          isUserAnswer={answer === 'optionOne'}
        />
        <QuestionBoxResult
          text={question.optionTwo.text}
          votes={question.optionTwo.votes.length}
          totalVotes={totalVotes}
          isUserAnswer={answer === 'optionTwo'}
        />
      </div>
    );
  }
}

QuestionItemResults.propTypes = {
  question: PropTypes.shape({
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
  }).isRequired,
  answer: PropTypes.string.isRequired,
};

export default QuestionItemResults;
