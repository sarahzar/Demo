
import { PURGE } from 'redux-persist/es/constants';
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = { domaines: []};
export function domaine(state = initialState, action) {
    switch (action.type) {

     
      
        case NomenclaturesConstants.GETALL_DOMAINES:
            return {

                domaines: action.domaines,

            };
            case PURGE:
                return {initialState};
        default:
            return state
    }
}