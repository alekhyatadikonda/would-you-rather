import { SET_AUTH_USER, CLEAR_AUTH_USER } from '../actions/authorizedUser';

export default function authorizedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTH_USER:
            return action.user;
        case CLEAR_AUTH_USER:
            return null;
        default:
            return state;
  }
}
