
import { PURGE } from 'redux-persist/es/constants';
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = { etablissements: [] };
export function etablissement(state = initialState, action) {
    switch (action.type) {

    
       
        case NomenclaturesConstants.GETALL_ETABLISSEMENTS:
            return {

                etablissements: action.etablissements,

            };
            case PURGE:
                return {initialState};
        default:
            return state
    }
}