import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavItem } from 'components';
import { clearAuthedUser } from 'actions';
import './styles.scss';

const mapStateToProps = ({ users, authedUser }) => ({
  user: users[authedUser],
});

const mapDispatchToProps = {
  logout: clearAuthedUser,
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: {
        home: {
          label: 'Home',
          route: '/',
        },
        add: {
          label: 'New Question',
          route: '/add',
        },
        leaderboard: {
          label: 'Leader Board',
          route: '/leaderboard',
        },
      },
    };
  }

  onClickNavItem = (key) => {
    const { sections } = this.state;

    Object.keys(sections).forEach((id) => {
      sections[id].active = key === id;
    });

    this.setState({
      sections,
    });
  };

  handleLogout = () => {
    const { logout, history } = this.props;
    history.push('/login');
    logout();
  };

  renderNavItems() {
    const { location } = this.props;
    const { sections } = this.state;

    return Object.keys(sections).map((key) => {
      const section = sections[key];
      return (
        <NavItem
          key={key}
          label={section.label}
          to={section.route}
          active={section.route === location.pathname}
          onClick={() => this.onClickNavItem(key)}
        />
      );
    });
  }

  render() {
    const { user } = this.props;
    return (
      <nav className="navbar fixed-top navbar-expand navbar-light bg-light">
        <ul className="navbar-nav mr-auto">{this.renderNavItems()}</ul>
        <div className="form-inline">
          <img className="navbar-avatar" alt={user.name} src={user.avatarURL} />
          <span className="navbar-text">{`Hello, ${user.name}`}</span>
          <button type="button" className="btn btn-outline-secondary" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    avatarURL: PropTypes.string,
    answers: PropTypes.shape({}),
  }).isRequired,
  logout: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Nav),
);
