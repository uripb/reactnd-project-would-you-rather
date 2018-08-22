import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const QuestionBoxResult = (props) => {
  const {
    text, votes, totalVotes, isUserAnswer,
  } = props;
  const percent = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
  const progressBarStyles = {
    width: `${percent}%`,
  };

  return (
    <div className={`question-box-result my-3 ${isUserAnswer ? 'user-answer' : ''}`}>
      <span className="question-text">{text}</span>
      <div className="progress mt-2">
        <div
          className="progress-bar bg-info"
          role="progressbar"
          style={progressBarStyles}
          aria-valuenow={percent}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {`${percent}%`}
        </div>
      </div>
      <span className="total-votes">{`${votes} out of ${totalVotes} votes`}</span>
    </div>
  );
};

QuestionBoxResult.defaultProps = {
  isUserAnswer: false,
};

QuestionBoxResult.propTypes = {
  text: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  totalVotes: PropTypes.number.isRequired,
  isUserAnswer: PropTypes.bool,
};

export default QuestionBoxResult;
