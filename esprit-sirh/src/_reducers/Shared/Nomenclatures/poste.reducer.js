
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = { postes: []};
export function poste(state = initialState, action) {
    switch (action.type) {

        case NomenclaturesConstants.GETALL_POSTES:
            return {

                postes: action.postes,
               


            };
      
      
        default:
            return state
    }
}