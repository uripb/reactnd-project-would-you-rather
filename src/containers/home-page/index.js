import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NavItem, QuestionsTab } from 'components';
import { receiveQuestions } from 'actions';
import './styles.scss';

const mapStateToProps = ({ questions, users, authedUser }) => {
  const questionsList = Object.values(questions).sort((a, b) => b.timestamp - a.timestamp);
  return {
    questions: questionsList,
    users,
    userQuestions: questionsList.filter(
      q => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser),
    ),
  };
};

const mapDispatchToProps = {
  getQuestions: receiveQuestions,
};

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        unanswered: {
          label: 'Unanswered Questions',
          active: true,
        },
        answered: {
          label: 'Answered Questions',
          active: false,
        },
      },
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  onClickTab = (key) => {
    const { tabs } = this.state;

    Object.keys(tabs).forEach((id) => {
      tabs[id].active = key === id;
    });

    this.setState({
      tabs,
    });
  };

  renderTabs() {
    const { tabs } = this.state;

    return Object.keys(tabs).map((key) => {
      const section = tabs[key];
      return (
        <NavItem
          key={key}
          label={section.label}
          to={`/${key}`}
          active={section.active}
          onClick={() => this.onClickTab(key)}
        />
      );
    });
  }

  render() {
    const {
      match, questions, users, userQuestions,
    } = this.props;

    return (
      <div className="container home-container mt-3">
        {questions.length > 0 && (
          <Fragment>
            <ul className="nav nav-tabs">{this.renderTabs()}</ul>
            <Switch>
              <Route
                path="/unanswered"
                render={props => <QuestionsTab {...props} questions={questions} users={users} />}
              />
              <Route
                path="/answered"
                render={props => (
                  <QuestionsTab {...props} questions={userQuestions} users={users} />
                )}
              />
              <Redirect to="/unanswered" />
            </Switch>
          </Fragment>
        )}
      </div>
    );
  }
}

HomePage.defaultProps = {
  questions: [],
  users: [],
};

HomePage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  getQuestions: PropTypes.func.isRequired,
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
