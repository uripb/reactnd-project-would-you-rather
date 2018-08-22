import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleAddQuestion } from 'actions';
import './styles.scss';

const mapDispatchToProps = {
  addQuestion: handleAddQuestion,
};

class NewQuestionPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textOpOne: '',
      textOpTwo: '',
      textOpOneInvalid: false,
      textOpTwoInvalid: false,
    };
  }

  handleChange = (e) => {
    const { value, id } = e.target;
    this.setState(() => ({
      [id]: value,
      [`${id}Invalid`]: value.length === 0,
    }));
  };

  handleBlur = (e) => {
    const { value, id } = e.target;
    this.setState(() => ({
      [`${id}Invalid`]: value.length === 0,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { textOpOne, textOpTwo } = this.state;
    const { addQuestion, history } = this.props;
    addQuestion(textOpOne, textOpTwo);

    this.setState(() => ({
      textOpOne: '',
      textOpTwo: '',
      opOneInvalid: false,
      opTwoInvalid: false,
    }));

    history.push('/');
  };

  render() {
    const {
      textOpOne, textOpTwo, textOpOneInvalid, textOpTwoInvalid,
    } = this.state;

    return (
      <div className="container new-question-container">
        <div className="card new-question-card mt-5">
          <div className="card-header">Create New Question</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <span className="card-title">Would you rather...</span>
              <div className="form-group">
                <input
                  type="text"
                  autoComplete="off"
                  className={`form-control ${textOpOneInvalid ? 'is-invalid' : ''}`}
                  id="textOpOne"
                  placeholder="Enter 'Option One' text here..."
                  value={textOpOne}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </div>
              <span className="between-inputs-text">OR</span>
              <div className="form-group">
                <input
                  type="text"
                  autoComplete="off"
                  className={`form-control ${textOpTwoInvalid ? 'is-invalid' : ''}`}
                  id="textOpTwo"
                  placeholder="Enter 'Option Two' text here..."
                  value={textOpTwo}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={textOpOne.length === 0 || textOpTwo.length === 0}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

NewQuestionPage.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(NewQuestionPage),
);
