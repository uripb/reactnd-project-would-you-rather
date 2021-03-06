import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { receiveUsers, setAuthedUser } from 'actions';
import './styles.scss';

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = {
  getUsers: receiveUsers,
  setAuthedUserFn: setAuthedUser,
};

class AuthenticationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    const { getUsers, users } = this.props;
    if (Object.keys(users).length === 0) {
      getUsers();
    }
  }

  onChangeSelect = (selectedUser) => {
    this.setState({
      user: selectedUser,
    });
  };

  handleSubmit = () => {
    const { user } = this.state;
    const {
      users, setAuthedUserFn, history, location,
    } = this.props;

    if (Object.keys(users).includes(user)) {
      setAuthedUserFn(user);
      if (location.state && location.state.referrer.length > 0) {
        history.push(location.state.referrer);
      } else {
        history.push('/');
      }
    } else {
      // eslint-disable-next-line
      console.warn('error login');
    }
  };

  renderSelect = () => {
    const { users } = this.props;

    return (
      <select
        className="form-control"
        id="users"
        onChange={e => this.onChangeSelect(e.target.value)}
      >
        <option value="">Select user...</option>
        {Object.keys(users).map(key => (
          <option key={key} value={users[key].id}>
            {users[key].name}
          </option>
        ))}
      </select>
    );
  };

  render() {
    const { user } = this.state;

    return (
      <div className="container auth-container">
        <div className="card">
          <div className="card-header">
            <h3 className="title">Welcome to the Would Rather App!</h3>
            <h5 className="message">Please sign in to continue</h5>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="users">User</label>
              {this.renderSelect()}
            </div>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={this.handleSubmit}
              disabled={user.length === 0}
            >
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
  getUsers: PropTypes.func.isRequired,
  setAuthedUserFn: PropTypes.func.isRequired,
  users: PropTypes.objectOf(
    PropTypes.shape({
      answers: PropTypes.shape({}),
      avatarURL: PropTypes.string,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthenticationPage),
);
