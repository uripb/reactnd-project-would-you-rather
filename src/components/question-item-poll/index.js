import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class QuestionItemPoll extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'optionOne',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { onSubmitClick, question } = this.props;
    const { selectedOption } = this.state;

    onSubmitClick(question.id, selectedOption);
  };

  handleOptionChange = (e) => {
    this.setState({
      selectedOption: e.target.id,
    });
  };

  render() {
    const { question } = this.props;
    const { selectedOption } = this.state;

    return (
      <div className="question-item-poll">
        <h5 className="card-title">Would you rather...</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="options"
              id="optionOne"
              value={question.optionOne.text}
              checked={selectedOption === 'optionOne'}
              onChange={this.handleOptionChange}
            />
            <label className="form-check-label" htmlFor="optionOne">
              {question.optionOne.text}
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="options"
              id="optionTwo"
              value={question.optionTwo.text}
              checked={selectedOption === 'optionTwo'}
              onChange={this.handleOptionChange}
            />
            <label className="form-check-label" htmlFor="optionTwo">
              {question.optionTwo.text}
            </label>
          </div>
          <button type="submit" className="btn btn-success w-100 mt-2">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

QuestionItemPoll.defaultProps = {
  onSubmitClick: () => null,
};

QuestionItemPoll.propTypes = {
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
  onSubmitClick: PropTypes.func,
};

export default QuestionItemPoll;
