import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  HomePage,
  Nav,
  NewQuestionPage,
  LeaderBoardPage,
  PollPage,
  NotFoundPage,
} from 'containers';

const DefaultPage = () => (
  <Fragment>
    <div className="page">
      <Nav />
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

export default DefaultPage;
