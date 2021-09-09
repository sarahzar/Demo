
import { PURGE } from 'redux-persist/es/constants';
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = {  specialites: [] };
export function specialite(state = initialState, action) {
    switch (action.type) {

       
        case NomenclaturesConstants.GETALL_SPECIALITES:
            return {

                specialites: action.specialites,

            };

            case PURGE:
                return {initialState};
        default:
            return state
    }
}