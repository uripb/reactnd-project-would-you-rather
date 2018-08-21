import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = ({ authedUser, users }) => ({
  isAuth: Object.keys(users).includes(authedUser),
  users,
});

const AuthorizedRoute = (props) => {
  const { component: Component, isAuth, ...rest } = props;

  return (
    <Route
      {...rest}
      render={propsAux => (isAuth ? <Component {...propsAux} /> : <Redirect to="/login" />)}
    />
  );
};

AuthorizedRoute.defaultProps = {
  isAuth: false,
};

AuthorizedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

export default connect(mapStateToProps)(AuthorizedRoute);
