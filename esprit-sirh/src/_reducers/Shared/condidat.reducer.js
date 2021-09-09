import { condidatConstants } from '../../_constants/condidat.constants';
import { PURGE } from "redux-persist";
const INITIAL_STATE = {
  condidatReducer: {}
};
export function condidat(state = {}, action) {
  switch (action.type) {
    case condidatConstants.SET_CONDIDAT:
      return {
        condidatReducer : action.condidatReducer
      };
      
      case PURGE:
        return {condidatReducer: null};
    
    default:
      return state
  }
}