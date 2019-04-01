import React from 'react';
import { connect } from 'react-redux';

function LeaderBoard(props) {
    const { users } = props;
    const sortedUsersArray = Object.keys(users).map((key) => users[key]).sort((user1, user2) => {
        return (Object.keys(user2.answers).length + user2.questions.length) -
            (Object.keys(user1.answers).length + user1.questions.length);
    });

    return (
        <div>
            <h3 className='center'>Leader Board</h3>
            <ul className='users'>
                {sortedUsersArray.map((user) => (
                    <li key={user.id}>
                        <div className='user'>
                            <img src={user.avatarURL} alt={user.name} className='stats-user-avatar' />
                            <div className='stats'>
                                <p>{user.name}</p>
                                <p>User Asked: {user.questions.length}</p>
                                <p>User Answered: {Object.keys(user.answers).length}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function mapStateToProps({ users }) {
    return {
        users,
    };
}

export default connect(mapStateToProps)(LeaderBoard)
