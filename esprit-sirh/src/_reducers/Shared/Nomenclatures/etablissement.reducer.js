
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = { etablissements: [] };
export function etablissement(state = initialState, action) {
    switch (action.type) {

    
       
        case NomenclaturesConstants.GETALL_ETABLISSEMENTS:
            return {

                etablissements: action.etablissements,

            };
       
        default:
            return state
    }
}