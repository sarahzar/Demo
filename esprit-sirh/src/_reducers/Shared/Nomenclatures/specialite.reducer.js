
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = {  specialites: [] };
export function specialite(state = initialState, action) {
    switch (action.type) {

       
        case NomenclaturesConstants.GETALL_SPECIALITES:
            return {

                specialites: action.specialites,

            };

       
        default:
            return state
    }
}