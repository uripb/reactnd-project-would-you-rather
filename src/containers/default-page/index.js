import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import {
  HomePage,
  Nav,
  NewQuestionPage,
  LeaderBoardPage,
  PollPage,
  NotFoundPage,
} from 'containers';

const DefaultPage = (props) => {
  const { location } = props;
  return (
    <Fragment>
      <div className="page">
        <Nav location={location} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/add" component={NewQuestionPage} />
          <Route path="/leaderboard" component={LeaderBoardPage} />
          <Route path="/questions/:question_id" component={PollPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Fragment>
  );
};

DefaultPage.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default DefaultPage;
