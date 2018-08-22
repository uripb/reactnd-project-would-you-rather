import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const UserScores = ({ answered, created }) => (
  <div className="user-scores">
    <div className="totals pb-2 mb-2">
      <div className="row mb-2">
        <div className="offset-1 col-7">
          <span className="lbl-text">Answered questions</span>
        </div>
        <div className="col-4 text-center">
          <span className="value-text">{answered}</span>
        </div>
      </div>
      <div className="row">
        <div className="offset-1 col-7">
          <span className="lbl-text">Created questions</span>
        </div>
        <div className="col-4 text-center">
          <span className="value-text">{created}</span>
        </div>
      </div>
    </div>
    <div className="score">
      <div className="row">
        <div className="offset-1 col-7">
          <span className="lbl-text">score</span>
        </div>
        <div className="col-4 text-center">
          <div className="value-text">{answered + created}</div>
        </div>
      </div>
    </div>
  </div>
);

UserScores.defaultProps = {
  answered: 0,
  created: 0,
};

UserScores.propTypes = {
  answered: PropTypes.number,
  created: PropTypes.number,
};

export default UserScores;
