import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { QuestionItem, QuestionItemPoll } from 'components';

const mapStateToProps = ({ questions, authedUser, users }, ownProps) => {
  const { match } = ownProps;
  const question = questions[match.params.question_id];
  const user = users[question.author];
  return {
    question,
    authedUser,
    user,
  };
};

class PollPage extends PureComponent {
  renderPoll() {
    const { user, question } = this.props;
    return (
      <QuestionItem user={user}>
        <QuestionItemPoll question={question} />
      </QuestionItem>
    );
  }

  render() {
    const { question, authedUser } = this.props;
    const isAnswered = question.optionOne.votes
      .concat(question.optionTwo.votes)
      .includes(authedUser);
    return (
      <div className="container poll-page-container mt-5">
        {isAnswered ? this.renderPoll() : <div>answered</div>}
      </div>
    );
  }
}

PollPage.defaultProps = {
  match: {},
  user: {},
};

PollPage.propTypes = {
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
  }),
  authedUser: PropTypes.string.isRequired,
  match: PropTypes.shape({}),
};

export default connect(mapStateToProps)(PollPage);
