import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavItem = ({
  label, to, active, onClick,
}) => (
  <li className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
    <Link to={to} className={`nav-link ${active ? 'active' : ''}`}>
      {label}
    </Link>
  </li>
);

NavItem.defaultProps = {
  active: false,
  onClick: () => null,
};

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default NavItem;
