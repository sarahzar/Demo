import { PURGE } from 'redux-persist/es/constants';
import { userConstants } from '../../_constants';

const initialState = { loggedIn: false, role: "" };

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_INFOS:
      return {
        loggedIn: true ,
          role : action.user.user.role
      };
    case PURGE:
      return { initialState };

    default:
      return state
  }
}