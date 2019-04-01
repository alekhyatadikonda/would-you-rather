export const SET_AUTH_USER = 'SET_AUTH_USER';
export const CLEAR_AUTH_USER = 'CLEAR_AUTH_USER';
export const GET_USERS = 'GET_USERS';


export function receiveUsers(users) {
    return {
        type: GET_USERS,
        users,
    };
}

export function setAuthorizedUser(user) {
  return {
    type: SET_AUTH_USER,
    user: user,
  };
}

export function clearAuthorizedUser() {
  return {
    type: CLEAR_AUTH_USER,
  };
}
