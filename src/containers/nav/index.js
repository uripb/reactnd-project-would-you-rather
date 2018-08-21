import React, { Component } from 'react';
import { NavItem } from 'components';
import './styles.scss';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: {
        home: {
          label: 'Home',
          active: true,
        },
        question: {
          label: 'New Question',
          active: false,
        },
        leader: {
          label: 'Leader Board',
          active: false,
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

  render() {
    const { sections } = this.state;
    return (
      <nav className="navbar navbar-expand navbar-light bg-light">
        <ul className="navbar-nav">
          {Object.keys(sections).map((key) => {
            const section = sections[key];
            return (
              <NavItem
                key={key}
                label={section.label}
                to={`/app/${key}`}
                active={section.active}
                onClick={() => this.onClickNavItem(key)}
              />
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Nav;
