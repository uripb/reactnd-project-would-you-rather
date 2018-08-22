import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

const NavItem = ({
  label, to, active, onClick,
}) => (
  <li className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
    {to !== null ? (
      <Link to={to} className={`nav-link ${active ? 'active' : ''}`}>
        {label}
      </Link>
    ) : (
      <span className={`nav-link ${active ? 'active' : ''}`}>{label}</span>
    )}
  </li>
);

NavItem.defaultProps = {
  active: false,
  onClick: () => null,
  to: null,
};

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default NavItem;
