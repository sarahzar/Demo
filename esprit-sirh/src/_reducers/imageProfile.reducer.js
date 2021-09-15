import { imageProfileConstants } from "../_constants/imageProfileConstants"; 
import { PURGE } from "redux-persist";
const INITIAL_STATE = {
  imagePath: {}
};
export function imageProfile(state = {}, action) {
  switch (action.type) {
    case imageProfileConstants.SET_IMAGE:
      return {
        imagePath : action.path
      };
      
      case PURGE:
        return {imagePath: null};
    
    default:
      return state
  }
}