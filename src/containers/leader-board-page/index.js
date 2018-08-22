import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { QuestionItem, UserScores } from 'components';

const mapStateToProps = ({ users }) => {
  const users2 = Object.values(users).sort(
    (a, b) => Object.keys(b.answers).length
      + b.questions.length
      - (Object.keys(a.answers).length + a.questions.length),
  );
  return { users: users2 };
};

const LeaderBoardPage = (props) => {
  const { users } = props;
  return (
    <div className="container leaderboard-container mt-5">
      {users.map(user => (
        <QuestionItem key={user.id} className="mb-3" user={user} title={user.name}>
          <UserScores answered={Object.keys(user.answers).length} created={user.questions.length} />
        </QuestionItem>
      ))}
    </div>
  );
};

LeaderBoardPage.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      answers: PropTypes.shape({}),
      avatarURL: PropTypes.string,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(LeaderBoardPage);
