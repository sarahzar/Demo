import { PURGE } from 'redux-persist/es/constants';
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = {  pays: [] };
export function pays(state = initialState, action) {
    switch (action.type) {

       
        case NomenclaturesConstants.GETALL_PAYS:
            return {

                pays: action.pays,

            };

            case PURGE:
                return {initialState};
        default:
            return state
    }
}