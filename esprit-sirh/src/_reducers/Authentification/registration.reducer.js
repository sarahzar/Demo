import { userConstants } from '../../_constants';
const initialisation ={registering:false,registerd:false,loading:false,login:""}

export function registration(state = initialisation, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registerd: false,registering: true ,loading:true,login: action.username};
    case userConstants.REGISTER_SUCCESS:
      return {registerd: true,loading:false,login: action.username};
    case userConstants.REGISTER_FAILURE:
      return {registerd: true,loading:false,login: null};
    case userConstants.LOGOUT:
        return {};
    default:
      return state
  }
}