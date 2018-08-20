import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.scss';

const mapStateToProps = ({ authentication }) => ({ auth: authentication });

class AuthenticationPage extends Component {
  componentWillReceiveProps(/* nextProps */) {
    /* if (nextProps.auth.authenticated) {
      this.props.history.push('/app');
    } */
  }

  render() {
    return <div className="container auth-container">login page</div>;
  }
}

export default connect(mapStateToProps)(AuthenticationPage);
