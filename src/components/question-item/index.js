import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class QuestionItem extends PureComponent {
  render() {
    const {
      user, children, className, title,
    } = this.props;
    return (
      <div className={`card card-question-item ${className}`}>
        <div className="card-header">{title.length > 0 ? title : `${user.name} asks:`}</div>
        <div className="card-body">
          <div className="row">
            <div className="col-4 avatar">
              <img src={user.avatarURL} alt={user.name} />
            </div>
            <div className="col-8">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}

QuestionItem.defaultProps = {
  children: null,
  className: '',
  title: '',
};

QuestionItem.propTypes = {
  user: PropTypes.shape({
    answers: PropTypes.shape({}),
    avatarURL: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  title: PropTypes.string,
};

export default QuestionItem;
