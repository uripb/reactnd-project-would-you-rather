import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { AuthenticationPage } from 'containers';
import DefaultPage from 'containers/default-page';
import { AuthorizedRoute } from 'components';

const App = (props) => {
  const { loading } = props;
  return (
    <Fragment>
      <LoadingBar />
      {loading === true ? null : (
        <Switch>
          <Route path="/auth/login" component={AuthenticationPage} />
          <AuthorizedRoute path="/app" component={DefaultPage} />
          <Redirect to="/auth/login" />
        </Switch>
      )}
    </Fragment>
  );
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default App;