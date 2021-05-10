
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = { etatCivils: []};
export function etatCivil(state = initialState, action) {
    switch (action.type) {

      
       
        case NomenclaturesConstants.GETALL_ETAT_CIVIL:
            return {

                etatCivils: action.etatCivils,

            };
        default:
            return state
    }
}