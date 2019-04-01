import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function NavigationTopBar(props) {
  const { authorizedUser, users } = props;

  const userLoggedIn = authorizedUser?  authorizedUser : null;
  const avatar = authorizedUser ? users[authorizedUser].avatarURL : 'placeholder.jpg';

  return (
    <nav className = 'nav-bar'>
        {
            userLoggedIn?
            <ul>
                <li>
                    <NavLink to='/home' exact activeClassName='active'>
                        <span style={{fontSize: '20px'}}>Would you rather?</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' exact activeClassName='active'>
                        Leader Board
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' exact activeClassName='active'>
                        Add Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/login' exact activeClassName='active'>
                        <div className = 'nav-user'>
                            <img src={avatar} alt={authorizedUser} className='nav-avatar'/>
                            Logout {authorizedUser}
                        </div>
                    </NavLink>
                </li>
            </ul>
            :
              <ul className='center'>
                <li style={{margin: 'auto', fontSize: '40px', width: '50%'}}>
                    <NavLink to='/login' exact activeClassName='active'>
                        Would you rather?
                    </NavLink>
                </li>
              </ul>
        }
    </nav>
  );
}

function mapStateToProps({ authorizedUser, users }) {
  return {
    authorizedUser,
    users
  };
}

export default connect(mapStateToProps, null, null, { pure: false })(NavigationTopBar)
