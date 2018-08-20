import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from 'containers';

const DefaultPage = (props) => {
  const { match } = props;

  return (
    <Fragment>
      <div className="page">
        <Switch>
          <Route path={`${match.path}/home`} component={HomePage} />
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
