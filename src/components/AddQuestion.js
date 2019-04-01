import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';

class AddQuestion extends Component {

  constructor(props){
      super(props)
      this.state= {
          optionOne: '',
          optionTwo: '',
          goToHome: false,
      }
  }

  handleChange = (event, optionIndex) => {
    const text = event.target.value;
    optionIndex === 1 ?
        this.setState({
            optionOne: text
        }) :
        this.setState({
            optionTwo: text
        })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo));
    this.setState ({
        goToHome: true,
    })
  }

  render() {
    const { authorizedUser, users } = this.props;
    const { optionOne, optionTwo, goToHome } = this.state;
    return goToHome === false ?
      <div>
        <h3 className='center'>Add Question</h3>
        <div className='question'>
          <div>
              <div className='question-avatar-wrapper'>
                  <img src={`/${users[authorizedUser].avatarURL}`} alt={authorizedUser} className='user-avatar'/>
              </div>
              <span>  Would You Rather..? </span>
          </div>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <div className = 'option'>
              <input placeholder='Option one' value={optionOne} onChange={(event) => this.handleChange(event, 1)}/>
            </div>
            <div className = 'option'>
              <input placeholder='Option two' value={optionTwo} onChange={(event) => this.handleChange(event, 2)}/>
            </div>
            <button className='submit-button' type='submit' disabled={optionOne === '' || optionTwo === ''}>
              Submit
            </button>
          </form>
        </div>
      </div> :
      <Redirect to='/home' />
  }
}

function mapStateToProps({ authorizedUser, users }) {
  return {
    authorizedUser,
    users,
  };
}

export default connect(mapStateToProps)(AddQuestion)
