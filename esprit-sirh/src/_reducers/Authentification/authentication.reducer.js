import { userConstants } from '../../_constants';

let user = {};
const initialState = user ? { loggedIn: false, user,username:"" ,loading:false,role:""} : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: false,
        user: action.user,
        username: action.user,
        loading:true
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        username: action.user.user.mail,
        loading:false,
        role: action.user.user.role
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        user: null,
        username: null,
        loading:false
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}