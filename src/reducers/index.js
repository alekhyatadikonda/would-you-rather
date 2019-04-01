import authorizedUser from './authorizedUser';
import users from './users';
import questions from './questions';
import { combineReducers } from 'redux';

export default combineReducers({
    authorizedUser,
    questions,
    users,
});

