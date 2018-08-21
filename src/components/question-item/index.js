import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class QuestionItem extends PureComponent {
  onClick = () => {};

  render() {
    const { question, user } = this.props;
    return (
      <div className="card card-question-item">
        <div className="card-header">{`${user.name} asks:`}</div>
        <div className="card-body">
          <div className="float-left avatar">
            <img src={user.avatarURL} alt={user.name} />
          </div>
          <div className="float-left card-info">
            <h5 className="card-title">Would you rather</h5>
            <p className="card-text">{`...${question.optionOne.text.substring(0, 15)}...`}</p>
            <button type="button" className="btn btn-outline-info w-100">
              View Poll
            </button>
          </div>
        </div>
      </div>
    );
  }
}

QuestionItem.propTypes = {
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
  user: PropTypes.shape({
    answers: PropTypes.shape({}),
    avatarURL: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionItem;
