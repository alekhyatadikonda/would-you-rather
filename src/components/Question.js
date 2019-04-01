import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/questions';

class Question extends Component {

  handleOptionClicked = (option, dashboard) => {
    if(!dashboard){
        const {question,handleAnswerQuestion} = this.props;
        const answer = option === 1 ? 'optionOne' : 'optionTwo';
        handleAnswerQuestion(question, answer)
    }
  };

  render() {
    const { authorizedUser, question, users, dashboard } = this.props;
    const answers = Object.keys(users[authorizedUser].answers);
    const answered = answers.indexOf(question.id) > -1;
    const votesOptionOne = question.optionOne.votes.length;
    const votesOptionTwo = question.optionTwo.votes.length;
    const votesTotal = votesOptionOne + votesOptionTwo;
    const percentVotesOptionOne = (votesOptionOne / votesTotal).toFixed(2) * 100;
    const percentVotesOptionTwo = (votesOptionTwo / votesTotal).toFixed(2) * 100;
    const optionOneClass = question.optionOne.votes.indexOf(authorizedUser) > -1 ?
        'question-option-selected' : answered ? 'answered' : ''
    const optionTwoClass = question.optionTwo.votes.indexOf(authorizedUser) > -1 ?
        'question-option-selected' : answered ? 'answered' : ''
    return (
      <Link to={`/questions/${question.id}`} className='question'>
        <div>
            <div className='question-avatar-wrapper'>
              <img src={`/${users[question.author].avatarURL}`}  alt={question.author} className='user-avatar' />
            </div>
            <span>Would You Rather..?</span>
        </div>
        <div className='option'>
          <button className={optionOneClass} onClick={() => this.handleOptionClicked(1, dashboard)} >
            {question.optionOne.text}
          </button>
          {answered ?
              <span className='stats'>
                Votes: {question.optionOne.votes.length} ({percentVotesOptionOne}%)
              </span>: null
          }
        </div>
        <div className='option'>
          <button className={optionTwoClass} onClick={(event) => this.handleOptionClicked(2, dashboard)}>
            {question.optionTwo.text}
          </button>
          {answered ?
              <span className='stats'>
                Votes: {question.optionTwo.votes.length} ({percentVotesOptionTwo}%)
              </span>: null
          }
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authorizedUser, users }) {
  return {
    authorizedUser,
    users,
  };
}

export default connect(mapStateToProps, actions)(Question);
