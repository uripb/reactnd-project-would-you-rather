import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { QuestionItem, QuestionItemPoll, QuestionItemResults } from 'components';
import { handleAnswerQuestion, handleQuestions } from 'actions';

const mapStateToProps = ({ questions, authedUser, users }, ownProps) => {
  const { match } = ownProps;
  const question = questions[match.params.question_id];
  const user = question ? users[question.author] : {};
  return {
    question,
    authedUser: users[authedUser],
    user,
  };
};

const mapDispatchToProps = {
  answerQuestion: handleAnswerQuestion,
  getQuestions: handleQuestions,
};

class PollPage extends PureComponent {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  onSubmitClick = (qid, answer) => {
    const { answerQuestion } = this.props;
    answerQuestion(qid, answer);
  };

  renderPoll() {
    const { question } = this.props;
    return <QuestionItemPoll question={question} onSubmitClick={this.onSubmitClick} />;
  }

  renderResults() {
    const { question, authedUser } = this.props;
    const answer = authedUser.answers[question.id];
    return <QuestionItemResults question={question} answer={answer} />;
  }

  render() {
    const { user, authedUser, question } = this.props;

    if (!question) {
      return <div>Loading...</div>;
    }

    const isAnswered = Object.keys(authedUser.answers).includes(question.id);
    return (
      <div className="container poll-page-container mt-5">
        <QuestionItem user={user}>
          {isAnswered ? this.renderResults() : this.renderPoll()}
        </QuestionItem>
      </div>
    );
  }
}

PollPage.defaultProps = {
  match: {},
};

PollPage.propTypes = {
  getQuestions: PropTypes.func.isRequired,
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
