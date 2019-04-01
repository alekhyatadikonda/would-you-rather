import {_getQuestions, _getUsers} from '../utils/_DATA';
import { receiveUsers } from './authorizedUser';
import { receiveQuestions } from './questions';


export function getInitialData() {
    return function(dispatch) {
        Promise.all([
            _getUsers(),
            _getQuestions(),
        ])
            .then(function([users, questions]) {
                return {
                    users,
                    questions,
                }
            })
            .then(function({ users, questions }) {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
            });
    }
}
