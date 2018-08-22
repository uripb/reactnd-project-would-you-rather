import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { AuthenticationPage } from 'containers';
import DefaultPage from 'containers/default-page';
import { AuthorizedRoute } from 'components';

const App = (props) => {
  const { loading } = props;
  return (
    <Fragment>
      <LoadingBar style={{ zIndex: 99999 }} />
      {loading === true ? null : (
        <Switch>
          <Route path="/login" component={AuthenticationPage} />
          <AuthorizedRoute path="/" component={DefaultPage} />
        </Switch>
      )}
    </Fragment>
  );
};

App.defaultProps = {
  loading: false,
};

App.propTypes = {
  loading: PropTypes.bool,
};

export default App;
