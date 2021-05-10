
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = { types: [] };
export function typeCondidature(state = initialState, action) {
    switch (action.type) {

    
      
        case NomenclaturesConstants.GETALL_TYPES_CONDIDATURES:
            return {

                types: action.types,

            };
       
        default:
            return state
    }
}