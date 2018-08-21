import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  HomePage, Nav, NewQuestionPage, LeaderBoardPage,
} from 'containers';

const DefaultPage = (props) => {
  const { match } = props;

  return (
    <Fragment>
      <div className="page">
        <Nav />
        <Switch>
          <Route path={`${match.path}/home`} component={HomePage} />
          <Route path={`${match.path}/question`} component={NewQuestionPage} />
          <Route path={`${match.path}/leader`} component={LeaderBoardPage} />
          <Redirect to={`${match.path}/home`} />
        </Switch>
      </div>
    </Fragment>
  );
};

DefaultPage.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default DefaultPage;
