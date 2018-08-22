import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { QuestionItem, QuestionItemPoll } from 'components';
import { handleAnswerQuestion } from 'actions';

const mapStateToProps = ({ questions, authedUser, users }, ownProps) => {
  const { match } = ownProps;
  const question = questions[match.params.question_id];
  const user = users[question.author];
  return {
    question,
    authedUser: users[authedUser],
    user,
  };
};

const mapDispatchToProps = {
  answerQuestion: handleAnswerQuestion,
};

class PollPage extends PureComponent {
  onSubmitClick = (qid, answer) => {
    const { answerQuestion } = this.props;
    answerQuestion(qid, answer);
  };

  renderPoll() {
    const { user, question } = this.props;
    return (
      <QuestionItem user={user}>
        <QuestionItemPoll question={question} onSubmitClick={this.onSubmitClick} />
      </QuestionItem>
    );
  }

  render() {
    const { authedUser, question } = this.props;
    const isAnswered = Object.keys(authedUser.answers).includes(question.id);
    return (
      <div className="container poll-page-container mt-5">
        {isAnswered ? <div>answered</div> : this.renderPoll()}
      </div>
    );
  }
}

PollPage.defaultProps = {
  match: {},
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
  }).isRequired,
  authedUser: PropTypes.shape({
    answers: PropTypes.shape({}),
    avatarURL: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({}),
  answerQuestion: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PollPage);
