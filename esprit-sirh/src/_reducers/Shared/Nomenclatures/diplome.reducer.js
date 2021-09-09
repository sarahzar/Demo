
import { PURGE } from "redux-persist";
import { NomenclaturesConstants } from '../../../_constants/NomenclaturesConstants';
const initialState = {diplomes: [] };
export function diplome(state = initialState, action) {
    switch (action.type) {

      
        case NomenclaturesConstants.GETALL_DIPLOMES:
            return {
                diplomes: action.diplomes,
            };
            case PURGE:
                return {initialState};
        default:
            return state
    }
}