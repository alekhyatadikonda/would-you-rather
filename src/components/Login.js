import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthorizedUser, clearAuthorizedUser } from '../actions/authorizedUser';

class Login extends Component {

  constructor(props) {
      super(props);
      this.state = {
          userId: null,
          goToHome: false,
      }
  }

  handleSelectionChanged = (event) => {
    const userId = event.target.value;
    this.setState({
        userId,
    })
  }

  handleLogin = () => {
    const { userId } = this.state;
    const { dispatch } = this.props;
    dispatch(setAuthorizedUser(userId));
    this.setState({
        goToHome: true,
    })
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(clearAuthorizedUser())
  }

  render() {
    const { userId, goToHome } = this.state;
    const { history, users } = this.props;
    const selected = userId ? userId : 0;
    const avatar = userId ? users[userId].avatarURL : 'generic.jpeg';


    if(goToHome) {
      const redirect = history.location.state;
      if (redirect != null) {
        return <Redirect to={redirect} push={true} />
      }
      return <Redirect to='/home' />
    }

    return (
      <div>
        <div className='login-box'>
          <span>Please select a user to Login</span>
          <div className='user-select'>
           <img
              src={avatar}
              alt={`Avatar of ${userId}`}
              className='stats-user-avatar'
            />
            <select value={selected} onChange={(event) => this.handleSelectionChanged(event)}>
              <option value={0} disabled>Select user...</option>
              {Object.keys(users).map((key) => {
                return (
                  <option value={users[key].id} key={key}>{users[key].name}</option>
                );
              })}
            </select>
          </div>
          <button
            className='submit-button'
            disabled={userId === null}
            onClick={() => this.handleLogin()}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login))


