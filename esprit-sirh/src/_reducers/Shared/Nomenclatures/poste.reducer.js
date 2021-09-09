
import { PURGE } from 'redux-persist/es/constants';
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = { postes: []};
export function poste(state = initialState, action) {
    switch (action.type) {

        case NomenclaturesConstants.GETALL_POSTES:
            return {

                postes: action.postes,
               


            };
            case PURGE:
                return {initialState};
      
        default:
            return state
    }
}