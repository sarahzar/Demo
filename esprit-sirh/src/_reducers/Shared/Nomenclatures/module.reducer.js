import { PURGE } from 'redux-persist/es/constants';
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = {  modules: [] };
export function module(state = initialState, action) {
    switch (action.type) {

       
        case NomenclaturesConstants.GETALL_MODULES:
            return {

                modules: action.modules,

            };
            case PURGE:
                return {initialState};
       
        default:
            return state
    }
}