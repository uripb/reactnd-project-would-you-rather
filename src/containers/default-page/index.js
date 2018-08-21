import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  HomePage, Nav, NewQuestionPage, LeaderBoardPage,
} from 'containers';

const DefaultPage = () => (
  <Fragment>
    <div className="page">
      <Nav />
      <Switch>
        <Route path="/add" component={NewQuestionPage} />
        <Route path="/leaderboard" component={LeaderBoardPage} />
        <Route path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Fragment>
);

export default DefaultPage;
