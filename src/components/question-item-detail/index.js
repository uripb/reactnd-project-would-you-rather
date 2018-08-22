import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class QuestionItemDetail extends PureComponent {
  onClick = (id) => {
    const { onViewPollClick } = this.props;
    onViewPollClick(id);
  };

  render() {
    const { question } = this.props;
    return (
      <div className="question-item-detail">
        <h5 className="card-title">Would you rather</h5>
        <p className="card-text">{`...${question.optionOne.text.substring(0, 15)}...`}</p>
        <button
          type="button"
          className="btn btn-outline-info w-100"
          onClick={() => this.onClick(question.id)}
        >
          View Poll
        </button>
      </div>
    );
  }
}

QuestionItemDetail.defaultProps = {
  onViewPollClick: () => null,
};

QuestionItemDetail.propTypes = {
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
  onViewPollClick: PropTypes.func,
};

export default QuestionItemDetail;
