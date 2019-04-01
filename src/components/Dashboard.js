import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {

  constructor(props){
      super(props);
      this.state = {
          showAnswered: false,
      }
  }

  handleFilterClicked = (showAnswered) => {
    this.setState({
        showAnswered
    });
  }

  render() {
    const { authorizedUser, questions } = this.props;
    const { showAnswered } = this.state;
    const questionsArray = Object.keys(questions).map((key) => questions[key]);
    const filteredQuestions = questionsArray.filter(function(question) {
      const contains = (
        question.optionOne.votes.indexOf(authorizedUser) > -1 || question.optionTwo.votes.indexOf(authorizedUser) > -1
      );
      return showAnswered ? contains : !contains;
    });
    const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div className='dashboard'>
        <div className='button-group'>
          <button className={showAnswered ? 'button-left' : 'button-left active'}
            onClick={() => this.handleFilterClicked(false)}>
            Unanswered
          </button>
          <button className={showAnswered ? 'button-right active' : 'button-right'}
            onClick={() => this.handleFilterClicked(true)}>
            Answered
          </button>
        </div>
        <ul className='questions'>
          {sortedQuestions.map((question) => (
            <li key={question.id}>
              <Question dashboard={true} question={question} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authorizedUser, questions, users }) {
  return {
    authorizedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Dashboard)
