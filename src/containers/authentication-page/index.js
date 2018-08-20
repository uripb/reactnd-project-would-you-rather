import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { receiveUsers } from 'actions';
import './styles.scss';

const mapStateToProps = ({ authentication, users }) => ({ auth: authentication, users });

const mapDispatchToProps = {
  receiveUsersFunc: receiveUsers,
};

class AuthenticationPage extends Component {
  componentDidMount() {
    const { receiveUsersFunc } = this.props;
    receiveUsersFunc();
  }

  renderSelect = () => {
    const { users } = this.props;

    return (
      <select className="form-control" id="users">
        <option value="">Select an option...</option>
        {Object.keys(users).map(key => (
          <option value={users[key].id}>{users[key].name}</option>
        ))}
      </select>
    );
  };

  render() {
    return (
      <div className="container auth-container">
        <div className="card">
          <div className="card-header">
            <h3 className="title">Welcome to the Would Rather App!</h3>
            <h5 className="message">Please sign in to continue</h5>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="users">Select User</label>
              {this.renderSelect()}
            </div>
            <button type="button" className="btn btn-primary btn-lg btn-block">
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AuthenticationPage.defaultProps = {
  users: {},
};

AuthenticationPage.propTypes = {
  receiveUsersFunc: PropTypes.func.isRequired,
  users: PropTypes.objectOf(
    PropTypes.shape({
      answers: PropTypes.shape({}),
      avatarURL: PropTypes.string,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticationPage);
