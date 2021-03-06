import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { NavItem, QuestionsTab } from 'components';
import { handleQuestions } from 'actions';
import './styles.scss';

const mapStateToProps = ({ questions, users, authedUser }) => {
  const questionsList = Object.values(questions).sort((a, b) => b.timestamp - a.timestamp);
  const userAnswers = Object.keys(users[authedUser].answers);
  return {
    unansweredQ: questionsList.filter(q => !userAnswers.includes(q.id)),
    users,
    answeredQ: questionsList.filter(q => userAnswers.includes(q.id)),
  };
};

const mapDispatchToProps = {
  getQuestions: handleQuestions,
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

  onViewPollClick = (questionId) => {
    const { history } = this.props;
    if (questionId.length > 0) {
      history.push(`/questions/${questionId}`);
    }
  };

  renderTabs() {
    const { tabs } = this.state;

    return Object.keys(tabs).map((key) => {
      const section = tabs[key];
      return (
        <NavItem
          key={key}
          label={section.label}
          active={section.active}
          onClick={() => this.onClickTab(key)}
        />
      );
    });
  }

  renderTabContent() {
    const { tabs } = this.state;
    const { users, unansweredQ, answeredQ } = this.props;
    return (
      <QuestionsTab
        questions={tabs.unanswered.active ? unansweredQ : answeredQ}
        users={users}
        onViewPollClick={this.onViewPollClick}
      />
    );
  }

  render() {
    const { unansweredQ, answeredQ } = this.props;
    return (
      <div className="container home-container mt-3">
        {(answeredQ.length > 0 || unansweredQ.length > 0) && (
          <Fragment>
            <ul className="nav nav-tabs">{this.renderTabs()}</ul>
            {this.renderTabContent()}
          </Fragment>
        )}
      </div>
    );
  }
}

HomePage.defaultProps = {
  unansweredQ: [],
  answeredQ: [],
  users: [],
};

HomePage.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  unansweredQ: PropTypes.arrayOf(
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
  answeredQ: PropTypes.arrayOf(
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
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomePage),
);
